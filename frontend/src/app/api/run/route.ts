import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { language, code } = await req.json();

        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language,
                version: '*',
                files: [{ content: code }]
            }) 
        });

        const result = await response.json();
        return NextResponse.json({ output: result.run.output || 'Execution Failed' });
    } catch(error) {
        return NextResponse.json({ error: 'Execution Failed'}, { status: 500 });
    }
}