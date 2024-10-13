import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    if (!folder) {
        return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
    }

    const imgDirectory = path.join(process.cwd(), 'public', folder);

    try {
        const filenames = fs.readdirSync(imgDirectory);

        const validFilenames = filenames
            .filter(filename => /^(\d+)-.*\.(jpg|jpeg|png)$/i.test(filename))
            .sort((a, b) => {
                const aNum = parseInt(a.split('-')[0]);
                const bNum = parseInt(b.split('-')[0]);
                return aNum - bNum;
            });

        const imagePaths = validFilenames.map(filename => `/${folder}/${filename}`);

        return NextResponse.json({ imagePaths });
    } catch (error) {
        console.error('Error reading directory:', error);
        return NextResponse.json({ error: 'Error reading directory' }, { status: 500 });
    }
}
