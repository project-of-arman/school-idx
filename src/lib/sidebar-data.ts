
'use server';

import pool from './db';

export interface SidebarWidget {
  id: number;
  widget_type: 'profile' | 'links' | 'image_link';
  title: string | null;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  content: string | null; // JSON for links
  sort_order: number;
}

const mockChairmanWidget: SidebarWidget = {
    id: 1,
    widget_type: 'profile',
    title: 'চেয়ারম্যান মহোদয়',
    subtitle: 'প্রফেসর মোঃ তৌহিদুল ইসলাম',
    image_url: 'https://dinajpureducationboard.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/officer_list/f9cf0e70_e4af_4764_8abe_83a9633483c9/Professor%20Md.%20Towhidul%20Islam.jpeg',
    link_url: null,
    link_text: null,
    content: null,
    sort_order: 1
};

const mockSecretaryWidget: SidebarWidget = {
    id: 2,
    widget_type: 'profile',
    title: 'সচিব',
    subtitle: 'প্রফেসর নূর মোঃ আব্দুর রাজ্জাক',
    image_url: 'https://images.unsplash.com/photo-1640583818579-740430212d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8YmFuZ2xhZGVzaGklMjB0ZWFjaGVyfGVufDB8fHx8MTc1MzQxNDQ5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    link_url: null,
    link_text: null,
    content: null,
    sort_order: 2
};

const mockEServicesWidget: SidebarWidget = {
    id: 3,
    widget_type: 'links',
    title: 'অভ্যন্তরীণ ই-সেবাসমূহ',
    subtitle: null,
    image_url: null,
    link_url: '#',
    link_text: 'সকল',
    content: JSON.stringify([
        { text: "ই-নথি", url: "#" },
        { text: "DBTP", url: "#" },
        { text: "Sonali Sheba", url: "#" },
        { text: "বিদেশগামী শিক্ষার্থীদের অনলাইন যাচাই/সত্যায়ন", url: "#" },
        { text: "Sonali Bank Account Entry", url: "#" }
    ]),
    sort_order: 3
};

const mockMyGovWidget: SidebarWidget = {
    id: 4,
    widget_type: 'image_link',
    title: 'myGov',
    subtitle: null,
    image_url: 'http://dinajpureducationboard.portal.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/page/73f019a5_e642_4099_a371_95e69e41f0d3/2021-04-05-14-38-09f45e3fab3c0628004f2ef68f3b1456.png',
    link_url: 'https://www.mygov.bd/',
    link_text: null,
    content: null,
    sort_order: 4
};

const mockDigitalServiceWidget: SidebarWidget = {
    id: 5,
    widget_type: 'image_link',
    title: 'Digital Service',
    subtitle: null,
    image_url: 'http://dinajpureducationboard.portal.gov.bd/sites/default/files/files/dinajpureducationboard.portal.gov.bd/page/3a223c34_e20a_42f0_a7f8_696773534b31/2021-04-05-14-39-e58f000300ef6393b7625143a59339a0.png',
    link_url: '#',
    link_text: null,
    content: null,
    sort_order: 5
};

const mockNationalPortalWidget: SidebarWidget = {
    id: 7,
    widget_type: 'image_link',
    title: 'National Portal',
    subtitle: null,
    image_url: 'https://dinajpureducationboard.gov.bd/sites/default/files/files/bmeb.portal.gov.bd/page/f35745b2_55a9_4633_afe5_a2ccd180add8/National-portal_bn.gif',
    link_url: '#',
    link_text: null,
    content: null,
    sort_order: 6
};

const mockImportantLinksWidget: SidebarWidget = {
    id: 6,
    widget_type: 'links',
    title: 'গুরুত্বপূর্ণ লিঙ্ক সমূহ',
    subtitle: null,
    image_url: null,
    link_url: null,
    link_text: null,
    content: JSON.stringify([
        { text: "জনপ্রশাসন মন্ত্রণালয়", url: "#" },
        { text: "শিক্ষা মন্ত্রনালয়", url: "#" },
        { text: "প্রাথমিক শিক্ষা অধিদপ্তর", url: "#" },
        { text: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর", url: "#" }
    ]),
    sort_order: 7
};


const mockWidgets: SidebarWidget[] = [
    mockChairmanWidget,
    mockSecretaryWidget,
    mockEServicesWidget,
    mockMyGovWidget,
    mockDigitalServiceWidget,
    mockNationalPortalWidget,
    mockImportantLinksWidget,
].sort((a, b) => a.sort_order - b.sort_order);


export async function getSidebarWidgets(): Promise<SidebarWidget[]> {
    if (!pool) {
        console.warn("Database not connected. Returning mock data for sidebar widgets.");
        return mockWidgets;
    }
    try {
        const [rows] = await pool.query('SELECT * FROM sidebar_widgets ORDER BY sort_order ASC');
        return rows as SidebarWidget[];
    } catch (error) {
        console.error('Failed to fetch sidebar widgets, returning mock data:', error);
        return mockWidgets;
    }
}
