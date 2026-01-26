
import { prisma } from './src/lib/db';

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'usmonovyusuf693@gmail.com' },
    });
    console.log("User found:", user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
