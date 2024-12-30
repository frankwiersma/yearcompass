export const mockReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Year Review Analysis</title>
    <style>
        :root {
            --primary-color: #1a365d;
            --secondary-color: #2c5282;
            --accent-color: #2b6cb0;
            --text-color: #2d3748;
            --background-color: #ffffff;
            --section-spacing: 2rem;
            --card-spacing: 1.5rem;
        }

        .header {
            text-align: center;
            margin-bottom: var(--section-spacing);
        }

        .section {
            margin-bottom: var(--section-spacing);
            page-break-inside: avoid;
        }

        .card {
            background: var(--background-color);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: var(--card-spacing);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            page-break-inside: avoid;
        }

        .insight-block {
            border-left: 4px solid var(--accent-color);
            padding-left: 1rem;
            margin: 1rem 0;
        }

        .pattern-title {
            color: var(--primary-color);
            font-weight: bold;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .theme-list {
            list-style-type: none;
            padding-left: 0;
        }

        .theme-list li {
            margin-bottom: 0.5rem;
            padding-left: 1.5rem;
            position: relative;
        }

        .theme-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: var(--accent-color);
        }

        @media print {
            body {
                padding: 0;
            }
            
            .card {
                break-inside: avoid;
            }
            
            .section {
                break-before: page;
            }
        }
    </style>
</head>
<body>
    <div class="section">
        <h1 class="header">Year 2024 Review & Analysis</h1>
        <div class="card">
            <h2>Executive Summary</h2>
            <div class="insight-block">
                <p>Your reflection reveals a year of significant personal and professional growth, marked by resilience in facing challenges and a strong focus on self-development. Key achievements include career advancement and improved work-life balance, while maintaining meaningful relationships and pursuing creative interests.</p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="card">
            <h2>Core Patterns & Themes</h2>
            <div class="pattern-section">
                <div class="pattern-title">Professional Growth</div>
                <ul class="theme-list">
                    <li>Consistent focus on skill development</li>
                    <li>Increased leadership responsibilities</li>
                    <li>Strategic career planning</li>
                </ul>
            </div>
            <div class="pattern-section">
                <div class="pattern-title">Personal Development</div>
                <ul class="theme-list">
                    <li>Enhanced self-awareness</li>
                    <li>Improved stress management</li>
                    <li>Better work-life integration</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="card">
            <h2>Development Cycles</h2>
            <p>Your year showed clear cycles of growth:</p>
            <div class="insight-block">
                <p><strong>Q1:</strong> Focus on foundation building<br>
                <strong>Q2:</strong> Skill development and learning<br>
                <strong>Q3:</strong> Implementation and practice<br>
                <strong>Q4:</strong> Reflection and planning</p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="card">
            <h2>Future Focus Areas</h2>
            <div class="pattern-section">
                <div class="pattern-title">Recommended Priority Areas</div>
                <ul class="theme-list">
                    <li>Continue professional development with focus on leadership</li>
                    <li>Maintain work-life balance through structured planning</li>
                    <li>Expand creative pursuits for personal fulfillment</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
`;