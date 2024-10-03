import URL from '../../../utils/models/Url';
import { NextResponse } from 'next/server';
import mongoConnect from '../../../utils/mongoConnection';
export async function POST(req) {
    const { code } = await req.json();

    if (!code) {
        return new NextResponse(JSON.stringify({ message: `code is required`, Code: null, error: 'code is required',success:false }),
            { status: 400, headers: new Headers({ 'Content-Type': 'application/' }) }
        );
    }
    await mongoConnect();
    const data = await URL.findOne({ code: code });
    if (!data) {
        return new NextResponse(JSON.stringify({ message: `Code Exipred`, Code: null, error: 'Code not found', success:false }),
            { status: 400, headers: new Headers({ 'Content-Type': 'application/' }) }
        );
    }

    return new NextResponse(JSON.stringify({ message: `Code get successfully`, data: data, error: null, success:true }),
        { status: 200, headers: new Headers({ 'Content-Type': 'application/' }) }

    );
}

