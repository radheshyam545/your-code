
import { NextResponse } from 'next/server';
import URL from '../../../utils/models/Url';
import mongoConnect from '../../../utils/mongoConnection';

async function generateToken() {
    const characters = '0123456789';
    let token = '';
    for (let i = 0; i < 6; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const isContain = await URL.findOne({ code: token });

    if (isContain) {
        return generateToken(); // Re-generate if token already exists
    }
    return token;
}

export async function POST(req) {
    const { url } = await req.json();

    if (!url) {
        return new NextResponse(JSON.stringify({ message: `URL is required`, Code: null, error: 'URL is required', success:false }),
            { status: 400, headers: new Headers({ 'Content-Type': 'application/' }) }
        );
    }

    await mongoConnect();

    const isContain = await URL.findOne({ url: url });

    if (isContain) {
        return new NextResponse(JSON.stringify({ message: `Url Already Exists`, Code: null, error: 'Url Already Exists', success:false  }),
         { status: 400, headers: new Headers({ 'Content-Type': 'application/' }) })
    }

    const code = await generateToken();

    const newUrl = new URL({
        url,
        code,
    });

    await newUrl.save();

    if (!newUrl) {
        return new NextResponse(JSON.stringify({ message: `Url Convert Failed`, Code: null, error: 'Url Convert Failed',success:false  }),
            { status: 400, headers: new Headers({ 'Content-Type': 'application/' }) }
        );
    }

    return new NextResponse(JSON.stringify({ message: `Url Convert Successfully`, data: newUrl, error: null, success:true  }),
        { status: 200, headers: new Headers({ 'Content-Type': 'application/' }) }
    );
}
