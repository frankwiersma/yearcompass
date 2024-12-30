import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
}

const MODEL_NAME = 'gemini-1.5-pro';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Type definitions for reflection data
interface ReflectionAnswer {
  question: string;
  answer: string;
  category?: string;
  section?: string;
}

interface OrganizedAnswers {
  [section: string]: {
    [category: string]: ReflectionAnswer[];
  };
}

export async function generateYearAnalysis(answers: Record<string, ReflectionAnswer>) {
  try {
    // Check if we have any answers to analyze
    if (Object.keys(answers).length === 0) {
      throw new Error('No answers available for analysis');
    }

    const categorizedAnswers = organizeByCategoryAndSection(answers);
    
    // Construct the analysis prompt
    const prompt = createAnalysisPrompt(categorizedAnswers);
    
    // Generate content using Gemini
    const result = await model.generateContent([prompt]);
    if (!result.response) {
      throw new Error('No response received from AI model');
    }
    
    const response = await result.response;
    let text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI model');
    }

    // Clean up any unwanted text or formatting from the response
    text = text
      .replace(/^```html\s*/i, '')  // Remove opening code fence
      .replace(/```\s*$/i, '')      // Remove closing code fence
      .replace(/This HTML document.*$/s, '')  // Remove trailing template comments
      .replace(/This improved HTML.*$/s, '')  // Remove any analysis comments
      .trim();

    return wrapInHtmlTemplate(text);
  } catch (error) {
    console.error('Error generating analysis:', error);
    throw error;
  }
}

function createAnalysisPrompt(categorizedAnswers: OrganizedAnswers): string {
  return `
As an expert life coach and personal development analyst, create a detailed year-end review analysis based on the following reflection data.

Important: Always return a complete HTML document with proper structure and styling.

You are an expert life coach and personal development analyst tasked with creating a comprehensive year-end review analysis.

ANALYTICAL FRAMEWORK:
1. Core Themes (identify 3-5 major patterns)
2. Development Cycles (map growth trajectories)
3. Future Pathways (strategic recommendations)
4. Integration Points (connections between areas)
INPUT DATA:
${JSON.stringify(categorizedAnswers, null, 2)}

LANGUAGE REQUIREMENTS:
First analyze the input data to determine if the majority of responses are in Dutch.
If the content is primarily in Dutch, provide the entire analysis output in Dutch.
If the content is primarily in English, provide the output in English.

OUTPUT REQUIREMENTS:

Create a structured HTML document with these sections:

1. Executive Summary
   - Key insights and patterns
   - Overall trajectory
   - Critical observations

2. Core Patterns & Themes
   - Major thematic elements
   - Recurring patterns
   - Growth indicators

3. Development Cycles
   - Learning patterns
   - Growth trajectories
   - Challenge areas

4. Future Focus Areas
   - Strategic recommendations
   - Development opportunities
   - Action steps

Use these HTML components:

<div class="section">
    <h2>Section Title</h2>
    <div class="card">
        <h3>Subsection Title</h3>
        <div class="insight-block">
            [Key insight or pattern]
        </div>
        <div class="theme-list">
            <ul>
                <li>[Theme point]</li>
            </ul>
        </div>
    </div>
</div>

ANALYTICAL GUIDELINES:
- Identify concrete patterns in responses
- Map interconnections between themes
- Provide specific, actionable insights
- Use evidence from responses
- Maintain professional tone
- Focus on growth and development
- Include specific examples

FORMAT REQUIREMENTS:
- Use semantic HTML structure
- Include proper heading hierarchy
- Wrap insights in insight-block divs
- Use cards for major sections
- Ensure clean, nested HTML
- Add descriptive class names
- Make content PDF-friendly

Generate the analysis now, focusing on profound insights while maintaining structural integrity.`;
}

function organizeByCategoryAndSection(answers: Record<string, ReflectionAnswer>): OrganizedAnswers {
  const organized: OrganizedAnswers = {};
  
  for (const [id, answer] of Object.entries(answers)) {
    const section = answer.section || 'Uncategorized';
    const category = answer.category || 'General';
    
    if (!organized[section]) {
      organized[section] = {};
    }
    if (!organized[section][category]) {
      organized[section][category] = [];
    }
    
    organized[section][category].push({
      ...answer,
      id
    });
  }
  
  return organized;
}

function wrapInHtmlTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Year Review Analysis</title>
    <style>
        /* Base Variables */
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --accent-color: #1abc9c;
            --text-color: #2d3436;
            --background-color: #ecf0f1;
            --section-spacing: 3rem;
            --card-spacing: 2rem;
        }

        /* Base Styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.8;
            color: var(--text-color);
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
            background-color: var(--background-color);
        }

        h1, h2, h3 {
            color: var(--primary-color);
            margin-top: 0;
        }

        h1 { font-size: 2.5rem; margin-bottom: 2rem; }
        h2 { font-size: 2rem; margin-bottom: 1.5rem; }
        h3 { font-size: 1.5rem; margin-bottom: 1rem; }

        .section {
            margin-bottom: var(--section-spacing);
        }

        .card {
            background: var(--background-color);
            border: 1px solid #bdc3c7;
            border-radius: 8px;
            padding: 2rem;
            margin-bottom: var(--card-spacing);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .insight-block {
            border-left: 5px solid var(--accent-color);
            padding: 1rem 1.5rem;
            margin: 1.5rem 0;
            background-color: rgba(26, 188, 156, 0.1);
            border-radius: 0 8px 8px 0;
        }

        .theme-list {
            list-style-type: disc;
            margin: 1rem 0;
            padding-left: 1.5rem;
        }

        blockquote {
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            background-color: rgba(52, 152, 219, 0.1);
            border-left: 4px solid var(--secondary-color);
            border-radius: 4px;
            font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            h1 {
                font-size: 2rem;
            }
            h2 {
                font-size: 1.75rem;
            }
            h3 {
                font-size: 1.25rem;
            }
        }

        /* Print Styles */
        @media print {
            body {
                padding: 0;
                background-color: white;
            }
            .card {
                box-shadow: none;
                border: 1px solid #ccc;
            }
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
}