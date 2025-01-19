import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ESLint } from 'eslint';
import prettier from 'prettier';

// Initialize Gemini API with your API key (from environment variable)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function formatAndLintCode(code: string): Promise<string> {
    try {
        const formattedCode = await prettier.format(code, { parser: "babel" });

        const eslint = new ESLint({ fix: true });
        const results = await eslint.lintText(formattedCode, { filePath: 'code.jsx' });

        const fixedCode = results[0]?.output || formattedCode;

        return fixedCode;
    } catch (error) {
        console.error("Error formatting/linting code:", error);
        return code; // Return original code if something goes wrong during formatting/linting
    }
}

// Helper function to remove code fences
function removeCodeFences(code: string): string {
    let trimmed = code.trim();
    if (trimmed.startsWith('```jsx')) {
        trimmed = trimmed.substring(5).trimStart();
    }
    if (trimmed.endsWith('```')) {
        trimmed = trimmed.substring(0, trimmed.length - 3).trimEnd();
    }
    return trimmed;
}

// Helper Function to extract dependencies
function extractDependencies(code: string): string[] {
    const importRegex = /import\s+(?:{\s*([\w\s,]+)\s*})\s+from\s+['"]([^'"]+)['"]/g;
    const dependencies = new Set<string>();
    let match;

    while ((match = importRegex.exec(code)) !== null) {
        const importPath = match[2];
        if (importPath.startsWith("@/components/ui/")) {
            const dep = importPath.split("/")[3]
            if (dep) {
                dependencies.add(`@/components/ui/${dep}`)
            }
        } else {
            dependencies.add(importPath)
        }
    }

    return Array.from(dependencies);
}

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }
        console.log("prompt: ", prompt);

        // Example Few-Shot Prompt with a Persona
        const enhancedPrompt = `
        You are a senior React engineer focused on creating clean, functional components. You use Tailwind CSS and Shadcn UI correctly. Import Shadcn UI components directly from their specific directories. The whole page should have a black background and all text should be white.
        
        Here are some examples of prompts and their corresponding code:

        Prompt: "Create a simple button with an alert on click using Shadcn UI".
        Code:
        \`\`\`jsx
        import { Button } from "@/components/ui/button"

        function MyButton() {
            const handleClick = () => alert('Button Clicked!');
            return (<Button variant={"primary"} onClick={handleClick}>Click Me</Button>);
        }
        export default MyButton;
        \`\`\`

        Prompt: "Create a basic input field using Shadcn UI".
        Code:
        \`\`\`jsx
        import { Input } from "@/components/ui/input"

        function MyInput() {
          return <Input type="text" placeholder="Enter text here" />
        }
        export default MyInput;
        \`\`\`

    
        
        Prompt: "create a basic form in react with email and password inputs, use tailwind css for styling give appropriate padding and margins the use shadcn ui card component the card should be in middle and the input fields should be styled and properly spaced, all the fields should have validation"
        
        Based on this understanding, and following those principles, please provide the code based on this prompt:
        
        ${prompt}

        You must only provide the code for the requested component, do not provide code for any other components like navbar or hero or the page function. Provide the code without any code fences. Use Shadcn UI components if they are needed and import them from their directories. The whole page should have a black background and the text should be white using tailwind css. Ensure proper padding, margins, and spacing. The output should be formatted properly. Ensure the correct variant prop format for the button i.e. variant={"primary"}. Use next/link for link and not <a></a>, rather use <Link href=""><p></p></Link> use p tag inside Link tag to give classNames to button.
        `;

        const generationConfig = {
            maxOutputTokens: 8000,
        };

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
            generationConfig
        });

        const response = result.response;
        let text = response.text();
        console.log("raw text", text)

        // Remove code fences
        text = removeCodeFences(text);

        console.log("removed code fences text", text)


        const code = await formatAndLintCode(text);

        console.log("formatted text", code)

        const dependencies = extractDependencies(code);


        return NextResponse.json({ code, dependencies }, { status: 200 });
    } catch (error: any) {
        console.error('Error generating code:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}