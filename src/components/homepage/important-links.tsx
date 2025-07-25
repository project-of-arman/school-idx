import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const linkCards = [
    {
        title: "শিক্ষা বোর্ড",
        image: "https://placehold.co/110x110.png",
        dataAiHint: "education board",
        links: [
            { text: "ঢাকা শিক্ষা বোর্ড", href: "#" },
            { text: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর", href: "#" },
            { text: "বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো", href: "#" },
            { text: "পাঠদান ও স্বীকৃতি", href: "/recognition" },
        ]
    },
    {
        title: "অন্যান্য",
        image: "https://placehold.co/110x110.png",
        dataAiHint: "books library",
        links: [
            { text: "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড", href: "#" },
            { text: "শিক্ষক বাতায়ন", href: "#" },
            { text: "মুক্তপাঠ", href: "#" },
        ]
    }
];

export default function ImportantLinks() {
    return (
        <div className="container mx-auto ">
            <h2 className="text-3xl font-bold text-primary font-headline mb-8 text-center">গুরুত্বপূর্ণ লিংকসমূহ</h2>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 ">
                {linkCards.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-primary">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="!px-4">
                            <div className="flex gap-6 items-center">
                                <div className="w-[110px] h-[110px] flex-shrink-0">
                                    <Image 
                                        src={card.image} 
                                        alt={card.title}
                                        width={110}
                                        height={110}
                                        className="rounded-lg w-full h-full object-cover"
                                        data-ai-hint={card.dataAiHint}
                                    />
                                </div>
                                <div className="w-full sm:w-2/3 flex flex-col overflow-hidden space-y-2">
                                    {card.links.map((link, linkIndex) => (
                                        <Button key={linkIndex} asChild variant="link" className="p-0 h-auto justify-start text-muted-foreground hover:text-primary text-left">
                                            <Link href={link.href} className="flex !items-start gap-2">
                                                <ArrowRight className="h-4 w-4 text-accent mt-1 shrink-0" />
                                                <span className="whitespace-normal">{link.text}</span>
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
