import "dotenv/config";

import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Categories
  console.log("📂 Creating categories...");
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Wedding Invitation",
        description: "Template undangan pernikahan modern dan elegan",
        slug: "wedding-invitation",
        image:
          "https://placehold.co/400x300/blue/white.png?text=Wedding+Invitation",
        is_active: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Birthday Invitation",
        description: "Template undangan ulang tahun yang meriah",
        slug: "birthday-invitation",
        image:
          "https://placehold.co/400x300/blue/white.png?text=Birthday+Invitation",
        is_active: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Corporate Event",
        description: "Template undangan acara perusahaan dan bisnis",
        slug: "corporate-event",
        image:
          "https://placehold.co/400x300/blue/white.png?text=Corporate+Event",
        is_active: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Graduation",
        description: "Template undangan wisuda dan kelulusan",
        slug: "graduation",
        image: "https://placehold.co/400x300/blue/white.png?text=Graduation",
        is_active: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Baby Shower",
        description: "Template undangan baby shower dan kelahiran",
        slug: "baby-shower",
        image: "https://placehold.co/400x300/blue/white.png?text=Baby+Shower",
        is_active: true,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create Templates
  console.log("🎨 Creating templates...");
  const templates = [
    // Wedding Templates
    {
      title: "Elegant Rose Wedding",
      description:
        "Template undangan pernikahan dengan tema mawar yang elegan dan romantis",
      price: 150000,
      discount_price: 120000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+3",
      ],
      lynk_id_url: "https://lynk.id/elegantrose",
      demo_url: "https://demo.sasak-invite.com/elegant-rose",
      category_id: categories[0].id,
      is_active: true,
      is_featured: true,
      tags: ["wedding", "elegant", "rose", "romantic", "pink"],
    },
    {
      title: "Modern Minimalist Wedding",
      description:
        "Template undangan pernikahan dengan desain minimalis dan modern",
      price: 200000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/modernminimal",
      demo_url: "https://demo.sasak-invite.com/modern-minimal",
      category_id: categories[0].id,
      is_active: true,
      is_featured: false,
      tags: ["wedding", "minimal", "modern", "clean", "white"],
    },
    {
      title: "Traditional Javanese Wedding",
      description:
        "Template undangan pernikahan dengan nuansa adat Jawa yang tradisional",
      price: 175000,
      discount_price: 150000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+3",
      ],
      lynk_id_url: "https://lynk.id/traditionaljavanese",
      demo_url: "https://demo.sasak-invite.com/traditional-javanese",
      category_id: categories[0].id,
      is_active: true,
      is_featured: true,
      tags: ["wedding", "traditional", "javanese", "cultural", "brown"],
    },
    // Birthday Templates
    {
      title: "Kids Birthday Party",
      description:
        "Template undangan ulang tahun anak dengan tema kartun yang ceria",
      price: 75000,
      discount_price: 60000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/kidsbirthdayparty",
      demo_url: "https://demo.sasak-invite.com/kids-birthday",
      category_id: categories[1].id,
      is_active: true,
      is_featured: true,
      tags: ["birthday", "kids", "cartoon", "colorful", "fun"],
    },
    {
      title: "Adult Birthday Celebration",
      description:
        "Template undangan ulang tahun dewasa dengan desain yang sophisticated",
      price: 100000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/adultbirthday",
      demo_url: "https://demo.sasak-invite.com/adult-birthday",
      category_id: categories[1].id,
      is_active: true,
      is_featured: false,
      tags: ["birthday", "adult", "sophisticated", "party", "celebration"],
    },
    // Corporate Templates
    {
      title: "Business Conference",
      description: "Template undangan konferensi bisnis yang profesional",
      price: 125000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/businessconference",
      demo_url: "https://demo.sasak-invite.com/business-conference",
      category_id: categories[2].id,
      is_active: true,
      is_featured: false,
      tags: ["corporate", "business", "conference", "professional", "blue"],
    },
    {
      title: "Company Anniversary",
      description: "Template undangan HUT perusahaan yang formal dan mewah",
      price: 150000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/companyanniversary",
      demo_url: "https://demo.sasak-invite.com/company-anniversary",
      category_id: categories[2].id,
      is_active: true,
      is_featured: true,
      tags: ["corporate", "anniversary", "formal", "luxury", "gold"],
    },
    // Graduation Templates
    {
      title: "University Graduation",
      description: "Template undangan wisuda universitas yang elegan",
      price: 90000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/universitygraduation",
      demo_url: "https://demo.sasak-invite.com/university-graduation",
      category_id: categories[3].id,
      is_active: true,
      is_featured: false,
      tags: ["graduation", "university", "academic", "achievement", "blue"],
    },
    // Baby Shower Templates
    {
      title: "Sweet Baby Shower",
      description:
        "Template undangan baby shower dengan tema yang manis dan lembut",
      price: 80000,
      discount_price: 65000,
      image: "https://placehold.co/600x400/blue/white.png?text=Sasak+Invite",
      thumbnail:
        "https://placehold.co/300x200/blue/white.png?text=Sasak+Invite",
      preview_images: [
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+1",
        "https://placehold.co/800x600/blue/white.png?text=Sasak+Invite+Preview+2",
      ],
      lynk_id_url: "https://lynk.id/sweetbabyshower",
      demo_url: "https://demo.sasak-invite.com/sweet-baby-shower",
      category_id: categories[4].id,
      is_active: true,
      is_featured: true,
      tags: ["baby-shower", "sweet", "soft", "pastel", "cute"],
    },
  ];

  for (const template of templates) {
    await prisma.template.create({ data: template });
  }

  console.log(`✅ Created ${templates.length} templates`);

  // Create Sample Orders
  console.log("📋 Creating sample orders...");
  const orders = [
    {
      order_number: "INV-001",
      customer_name: "Ahmad Zulkarnain",
      customer_email: "ahmad.zul@email.com",
      customer_phone: "+6281234567890",
      total_amount: 120000,
      status: "COMPLETED",
      payment_method: "Transfer Bank",
      lynk_id_transaction_id: "LYN-TRX-001",
      notes: "Template sudah dikirim via email",
      order_items: [
        {
          template_id: templates[0].title,
          price: 120000,
          quantity: 1,
        },
      ],
    },
    {
      order_number: "INV-002",
      customer_name: "Siti Nurhaliza",
      customer_email: "siti.nur@email.com",
      customer_phone: "+6281987654321",
      total_amount: 60000,
      status: "PAID",
      payment_method: "E-Wallet",
      lynk_id_transaction_id: "LYN-TRX-002",
      notes: "Menunggu proses download link",
    },
    {
      order_number: "INV-003",
      customer_name: "Budi Santoso",
      customer_email: "budi.santoso@email.com",
      customer_phone: "+6281122334455",
      total_amount: 150000,
      status: "PROCESSING",
      payment_method: "Transfer Bank",
      lynk_id_transaction_id: "LYN-TRX-003",
      notes: "Sedang proses customization",
    },
  ];

  // Note: Simplified order creation since we need to create templates first
  const createdTemplates = await prisma.template.findMany();

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    await prisma.order.create({
      data: {
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        total_amount: order.total_amount,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: order.status as any,
        payment_method: order.payment_method,
        lynk_id_transaction_id: order.lynk_id_transaction_id,
        notes: order.notes,
        order_items: {
          create: [
            {
              template_id: createdTemplates[i].id,
              price: order.total_amount,
              quantity: 1,
            },
          ],
        },
      },
    });
  }

  console.log(`✅ Created ${orders.length} sample orders`);

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during database seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
