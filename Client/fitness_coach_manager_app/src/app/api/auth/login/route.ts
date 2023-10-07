import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { strict } from 'assert';
import { parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies';
const MAX_AGE : number = 60* 60* 24* 30;

export async function POST(req:Request) {
    
    const body = await req.json();

    const {username, password_hash} = body;

    if(username != 'admin' && password_hash != 'admin') {
    return NextResponse.json({
         message:'not admin',
    },
    {
        status: 401,
    })
    };

    const secret = process.env.JWT_SECRET || "";
    const token = sign(
    {
        username,
    },
        secret, 
        {
           expiresIn : MAX_AGE
        }
    );

    const serialized = serialize( "OutSiteJWT", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: MAX_AGE,
        path: "./",
    });
    const response = {message :'authenticated'}
    return new Response ( JSON.stringify(response), {
        status:200,
        headers: {"Set-Cookie": serialized }
    })

}
