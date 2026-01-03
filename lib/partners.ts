
import fs from 'fs';
import path from 'path';

export type Partner = {
    name: string;
    logo: string;
};

export function getPartners(): Partner[] {
    const partnersDir = path.join(process.cwd(), 'public', 'partners');

    if (!fs.existsSync(partnersDir)) {
        return [];
    }

    const files = fs.readdirSync(partnersDir);

    const partners = files
        .filter(file => /\.(jpg|jpeg|png|webp|svg)$/i.test(file))
        .map(file => {
            const name = path.parse(file).name;
            return {
                name: name,
                logo: `/partners/${file}`
            };
        });

    return partners;
}
