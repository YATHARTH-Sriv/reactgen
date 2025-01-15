import { NextRequest, NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai-edge";

// Configure OpenAI API
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    console.log("Prompt:", prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "ft:gpt-4o-mini-2024-07-18:personal::Aq3wW72n",
      messages: [
        {
          role: "system",
          content: `You are an expert React developer. Generate a TypeScript React component that:
            1. Uses functional components.
            2. Uses DaisyUI for responsive and accessible styling.
            3. Includes proper TypeScript types for props, state, and any functions.
            4. Follows React and accessibility best practices (e.g., semantic HTML, ARIA attributes).
            5. Provides responsive and visually appealing UI with a clean layout.
            6. Leverages DaisyUI's components (e.g., card, navbar, button) and Tailwind CSS utility classes for styling.
            7. Displays fallback states for loading and errors if necessary.
            8. Uses meaningful class names that align with DaisyUI's design principles.
            
            Return only the code for the React component. Do not include markdown or explanations. Ensure the code is clean, readable, and production-ready`
        },
        {
          role: "user",
          content: `Create a React component for: ${prompt}`
        }
      ],
      stream: true,
      temperature: 1,
      max_tokens: 4000,
    });

    if (!response.body) {
      return NextResponse.json(
        { error: "Failed to generate component" },
        { status: 500 }
      );
    }

    // Transform the response into a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.error(new Error("Response body is null"));
          return;
        }
        const reader = response.body.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }

            // Decode the chunk and split into lines
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();
                
                if (data === '[DONE]') {
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content || '';
                  if (content) {
                    controller.enqueue(new TextEncoder().encode(content));
                  }
                } catch (error) {
                  console.error('Parsing error:', data);
                  // Continue processing even if one chunk fails
                  continue;
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream reading error:', error);
          controller.error(error);
        }
      }
    });

    // Return the stream with appropriate headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("Error generating component:", error);
    return NextResponse.json(
      { error: "Failed to generate component" },
      { status: 500 }
    );
  }
}

export const runtime = "edge";