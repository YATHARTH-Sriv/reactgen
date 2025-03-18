import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ESLint } from 'eslint';
import prettier from 'prettier';

// Initialize Gemini API with your API key (from environment variable)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
        
        Here are some examples of prompts and their correspondinzg code:

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




// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { ESLint } from 'eslint';
// import prettier from 'prettier';
// import puppeteer, { Browser, Page } from 'puppeteer';

// // Define types for function arguments and return
// interface ExtractCSSArgs {
//     url: string;
// }

// interface StyleInfo {
//     styleSheets: string[];
//     inlineStyles: string[];
//     computedStyles: Record<string, any>;
// }

// // Initialize Gemini API with your API key (from environment variable)
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// async function formatAndLintCode(code: string): Promise<string> {
//     try {
//         const formattedCode = await prettier.format(code, { parser: "babel" });

//         const eslint = new ESLint({ fix: true });
//         const results = await eslint.lintText(formattedCode, { filePath: 'code.jsx' });

//         const fixedCode = results[0]?.output || formattedCode;

//         return fixedCode;
//     } catch (error) {
//         console.error("Error formatting/linting code:", error);
//         return code; // Return original code if something goes wrong during formatting/linting
//     }
// }

// // Helper function to remove code fences
// function removeCodeFences(code: string): string {
//     let trimmed = code.trim();
//     if (trimmed.startsWith('```jsx')) {
//         trimmed = trimmed.substring(5).trimStart();
//     }
//     if (trimmed.endsWith('```')) {
//         trimmed = trimmed.substring(0, trimmed.length - 3).trimEnd();
//     }
//     return trimmed;
// }

// // Helper Function to extract dependencies
// function extractDependencies(code: string): string[] {
//     const importRegex = /import\s+(?:{\s*([\w\s,]+)\s*})\s+from\s+['"]([^'"]+)['"]/g;
//     const dependencies = new Set<string>();
//     let match;

//     while ((match = importRegex.exec(code)) !== null) {
//         const importPath = match[2];
//         if (importPath.startsWith("@/components/ui/")) {
//             const dep = importPath.split("/")[3]
//             if (dep) {
//                 dependencies.add(`@/components/ui/${dep}`)
//             }
//         } else {
//             dependencies.add(importPath)
//         }
//     }

//     return Array.from(dependencies);
// }

// function mapCssToTailwind(css: Record<string, string>): string {
//     let tailwindClasses = "";

//     if (css["background-color"]) {
//         // Very basic mapping - you'd need a more comprehensive solution
//         if (css["background-color"] === "rgb(0, 0, 0)") {
//             tailwindClasses += " bg-black";
//         } else if (css["background-color"] === "rgb(31, 41, 55)") {
//             tailwindClasses += " bg-gray-800"; // Example mapping
//         }
//         // Add more color mappings
//     }

//     if (css["color"]) {
//         if (css["color"] === "rgb(255, 255, 255)") {
//             tailwindClasses += " text-white";
//         } else if (css["color"] === "rgb(156, 163, 175)") {
//             tailwindClasses += " text-gray-400"; // Example mapping
//         }
//         // Add more color mappings
//     }

//     if (css["padding"]) {
//         if (css["padding"] === "1rem") {
//             tailwindClasses += " p-4"; // Example mapping
//         }
//     }

//     if (css["border-radius"]) {
//         if (css["border-radius"] === "0.5rem") {
//             tailwindClasses += " rounded-lg"; // Example mapping
//         }
//     }


//     return tailwindClasses;
// }

// // Function to extract CSS (as you provided)
// async function extractWebpageCSS(url: string): Promise<any> {
//     console.log("extracting css from url: ", url)
//     let browser: Browser | null = null;
//     try {
//         browser = await puppeteer.launch({
//             headless: true,
//         });

//         const page = await browser.newPage();
//         await page.goto(url, { waitUntil: 'networkidle0' });

//         // Target specific elements and extract relevant styles
//         const extractedStyles = await page.evaluate(() => {
//             const card = document.querySelector('.max-w-md'); // Adjust selector as needed
//             const emailInput = document.querySelector('#email'); // Adjust selector
//             const passwordInput = document.querySelector('#password'); // Adjust selector
//             const button = document.querySelector('button'); // Adjust selector

//             function getStyles(element: Element | null): Record<string, string> | null {
//                 if (!element) return null;
//                 const styles = window.getComputedStyle(element);
//                 const elementStyles: Record<string, string> = {};

//                 [
//                     'color', 'background-color', 'font-size', 'font-family',
//                     'margin', 'padding', 'border', 'display', 'position',
//                     'width', 'height', 'flex', 'grid', 'gap',
//                     'border-radius', 'box-shadow', 'transition'
//                 ].forEach(prop => {
//                     elementStyles[prop] = styles.getPropertyValue(prop);
//                 });
//                 return elementStyles;
//             }

//             return {
//                 card: getStyles(card),
//                 emailInput: getStyles(emailInput),
//                 passwordInput: getStyles(passwordInput),
//                 button: getStyles(button),
//             };
//         });

//         // Simplify the style representation and map to Tailwind (example)
//         const simplifiedStyles: any = {};
//         const extractedStylesTyped: { [key: string]: Record<string, string> | null } = extractedStyles;
//         for (const key in extractedStylesTyped) {
//             const styles = extractedStylesTyped[key];
//             if (styles) {
//                 simplifiedStyles[key] = {
//                     tailwindClasses: mapCssToTailwind(styles),
//                     // Add other relevant style info here if needed
//                     color: styles.color,
//                     backgroundColor: styles.backgroundColor,
//                     fontSize: styles.fontSize,
//                     padding: styles.padding,
//                     borderRadius: styles.borderRadius
//                 };
//             }
//         }

//         return simplifiedStyles;

//     } catch (error) {
//         console.error('Error extracting CSS:', error);
//         throw error;
//     } finally {
//         if (browser) {
//             await browser.close();
//         }
//     }
// }

// export async function POST(req: NextRequest) {
//     try {
//         const { prompt } = await req.json();

//         if (!prompt) {
//             return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
//         }
//         console.log("prompt: ", prompt);

//         // Define the function schema for Gemini
//         const functionDeclarations = [
//             {
//                 name: "extractWebpageCSS",
//                 description: "Extracts CSS styles from a given URL.",
//                 parameters: {
//                     type: "object",
//                     properties: {
//                         url: {
//                             type: "string",
//                             description: "The URL of the webpage to extract CSS from.",
//                         },
//                     },
//                     required: ["url"],
//                 },
//             },
//         ] as any;

//         // Updated Prompt with instructions for tool use
//         const enhancedPrompt = `
//         You are a senior React engineer focused on creating clean, functional components. You use Tailwind CSS and Shadcn UI correctly. Import Shadcn UI components directly from their specific directories. The whole page should have a black background and all text should be white.

//         You have access to a tool called 'extractWebpageCSS' that can extract CSS styles from a webpage, given its URL.

//         If the user provides a URL in their prompt and asks to replicate the design or styling of that webpage, you *MUST* use the 'extractWebpageCSS' tool to get the CSS.  Use the styles extracted to inform your component design.

//         Here are some examples of prompts and their corresponding code:

//         Prompt: "Create a simple button with an alert on click using Shadcn UI".
//         Code:
//         \`\`\`jsx
//         import { Button } from "@/components/ui/button"

//         function MyButton() {
//             const handleClick = () => alert('Button Clicked!');
//             return (<Button variant={"primary"} onClick={handleClick}>Click Me</Button>);
//         }
//         export default MyButton;
//         \`\`\`

//         Prompt: "Create a basic input field using Shadcn UI".
//         Code:
//         \`\`\`jsx
//         import { Input } from "@/components/ui/input"

//         function MyInput() {
//           return <Input type="text" placeholder="Enter text here" />
//         }
//         export default MyInput;
//         \`\`\`

//         Prompt: "Create a card using Shadcn UI".
//         Code:
//         \`\`\`jsx
//         import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

//         function MyCard() {
//           return (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Card Title</CardTitle>
//                 <CardDescription>Card Description</CardDescription>
//               </CardHeader>
//               <CardContent>Card Content</CardContent>
//             </Card>
//           );
//         }
//         export default MyCard;
//         \`\`\`

//         Prompt: "Create a basic form in react with email and password inputs, use tailwind css for styling give appropriate padding and margins the use shadcn ui card component the card should be in middle and the input fields should be styled and properly spaced, all the fields should have validation"

//         Based on this understanding, and following those principles, please provide the code based on this prompt:

//         ${prompt}

//         You must only provide the code for the requested component, do not provide code for any other components like navbar or hero or the page function. Provide the code without any code fences. Use Shadcn UI components if they are needed and import them from their directories. The whole page should have a black background and the text should be white using tailwind css. Ensure proper padding, margins, and spacing. The output should be formatted properly. Ensure the correct variant prop format for the button i.e. variant={"primary"}. Use next/link for link and not <a></a>, rather use <Link href=""><p></p></Link> use p tag inside Link tag to give classNames to button.
//         `;

//         const generationConfig = {
//             maxOutputTokens: 8000,
//         };

//         const tools = [{ functionDeclarations: functionDeclarations }];

//         const result = await model.generateContent({
//             contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
//             generationConfig,
//             tools
//         });

//         const response = result.response;
//         console.log("gemini response", response)

//         let text = response.text();
//         let code: string | null = null;

//         // Check if Gemini wants to call a function
//         if (response.candidates && response.candidates[0]?.content?.parts) {
//             const firstPart = response.candidates[0].content.parts[0];

//             if (firstPart.functionCall) {
//                 const functionName = firstPart.functionCall.name;
//                 const functionArgs = firstPart.functionCall.args as ExtractCSSArgs;

//                 if (functionName === "extractWebpageCSS") {
//                     try {
//                         console.log("calling css extraction tool")
//                         const cssData = await extractWebpageCSS(functionArgs.url);
//                         console.log("css data", cssData)

//                         // Integrate the CSS data into your prompt for code generation
//                         const cssPrompt = `You are a senior React engineer.
//                         You have extracted the following CSS styles from ${functionArgs.url}.

//                         Card Styles: ${JSON.stringify(cssData?.card)}
//                         Email Input Styles: ${JSON.stringify(cssData?.emailInput)}
//                         Password Input Styles: ${JSON.stringify(cssData?.passwordInput)}
//                         Button Styles: ${JSON.stringify(cssData?.button)}

//                         Use these styles to create a React component that closely matches the styling of the webpage. Use Tailwind CSS classes and Shadcn UI components. Pay specific attention to the background colors, text colors, font sizes, padding, and border radius. The user asked for: ${prompt}.  Be sure to use the tailwindClasses when styling. The whole page should have a black background and the text should be white. Do not use code fences.`;

//                         const cssResult = await model.generateContent({
//                             contents: [{ role: 'user', parts: [{ text: cssPrompt }] }],
//                             generationConfig
//                         });

//                         text = cssResult.response.text();

//                     } catch (error: any) {
//                         console.error("Error extracting CSS or generating code with CSS:", error);
//                         return NextResponse.json({ error: `Error extracting CSS: ${error.message}` }, { status: 500 });
//                     }
//                 }
//             } else {
//                 //If there's no tool call but a text response proceed normally
//                 text = response.text()
//             }
//         }


//         // Remove code fences
//         text = removeCodeFences(text);

//         code = await formatAndLintCode(text);

//         const dependencies = extractDependencies(code);


//         return NextResponse.json({ code, dependencies }, { status: 200 });
//     } catch (error: any) {
//         console.error('Error generating code:', error);
//         return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
//     }
// }