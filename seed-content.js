/**
 * Seed Script: Hedayetullah Interior Design Studio
 * Location: Arar, Northern Frontier Province, Kingdom of Saudi Arabia
 * Specialty: Suspended Ceilings, Drywall Partitions, Interior Fit-Out & Finishing
 *
 * Populates all site content: Settings, Services, TrustFeatures,
 * StatCounters, FAQs, and Testimonials.
 *
 * Run with: node seed-content.js
 */

const { PrismaClient } = require('@prisma/client')
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
require('dotenv').config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🚀 Starting seed for Hedayetullah Interior Design Studio...')

  // ─────────────────────────────────────────────
  // 1. SITE SETTINGS
  // ─────────────────────────────────────────────
  console.log('📋 Seeding Site Settings...')
  const existingSettings = await prisma.siteSettings.findFirst()

  const settingsData = {
    brandName: 'Hedayetullah Interior Design Studio',
    brandNameAr: 'استوديو هدايت الله للتصميم الداخلي',
    phone: '+966531285984',
    whatsapp: '+966531285984',
    email: 'hedayetullah102@gmail.com',
    address: 'Arar, Northern Frontier Province, Kingdom of Saudi Arabia',
    addressAr: 'عرعر، منطقة الحدود الشمالية، المملكة العربية السعودية',

    instagram: 'https://instagram.com/gypceilingmaster',
    facebook: 'https://facebook.com/gypceilingmaster',

    heroHeadline: 'Delivering Precision. Building Perfection.',
    heroHeadlineAr: 'نقدم الدقة. نبني الكمال.',
    heroSubheadline: 'Specialized in suspended ceiling systems, drywall partitions, acoustic & fireproof board installations, and full interior fit-out works across Saudi Arabia.',
    heroSubheadlineAr: 'متخصصون في أنظمة الأسقف المعلقة وتقسيمات الجدران الجافة وألواح العزل الصوتي ومقاومة الحريق وأعمال التشطيبات الداخلية الكاملة في جميع أنحاء المملكة العربية السعودية.',

    workingHours: 'Sat–Thu: 7:00 AM – 9:00 PM',
    workingHoursAr: 'السبت – الخميس: ٧:٠٠ ص – ٩:٠٠ م',
    serviceAreas: 'Arar, Northern Frontier Province, and across the Kingdom of Saudi Arabia',
    serviceAreasAr: 'عرعر، منطقة الحدود الشمالية، وجميع أنحاء المملكة العربية السعودية',
    footerTagline: 'Build with quality. Finish with excellence.',
    footerTaglineAr: 'ابنِ بجودة. أنجز بتميز.',

    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.0!2d41.0!3d30.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sArar%2C+Saudi+Arabia!5e0!3m2!1sen!2ssa!4v1234567890',
  }

  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: settingsData,
    })
    console.log('  ✓ Updated Site Settings')
  } else {
    await prisma.siteSettings.create({ data: settingsData })
    console.log('  ✓ Created Site Settings')
  }

  // ─────────────────────────────────────────────
  // 2. SERVICES
  // ─────────────────────────────────────────────
  console.log('🔧 Seeding Services...')
  await prisma.service.deleteMany({})

  const services = [
    {
      title: 'Suspended Ceiling Systems',
      titleAr: 'أنظمة الأسقف المعلقة',
      slug: 'suspended-ceiling-systems',
      description: 'Expert installation of all types of suspended ceiling systems — from standard gypsum board ceilings to decorative and hidden lighting designs. We handle healthcare, educational, commercial, and residential projects with precision and full project management.',
      descriptionAr: 'تركيب احترافي لجميع أنواع أنظمة الأسقف المعلقة — من ألواح الجبس القياسية إلى التصميمات الزخرفية وإضاءة LED الخفية. ننفذ مشاريع الرعاية الصحية والتعليم والتجارة والسكن بدقة متناهية وإدارة مشروع كاملة.',
      icon: 'LayoutGrid',
      features: [
        'Standard & decorative gypsum board ceilings',
        'Aluminum & metal tile suspended ceiling systems',
        'Hidden LED lighting fixture design & integration',
        'Modern 3D ceiling design & renders',
        'Healthcare, educational & commercial projects',
        'Full project management & site supervision',
      ],
      featuresAr: [
        'أسقف جبسية قياسية وزخرفية',
        'أنظمة أسقف معلقة من الألومنيوم والألواح المعدنية',
        'تصميم وتركيب إضاءة LED خفية',
        'تصميمات أسقف ثلاثية الأبعاد حديثة',
        'مشاريع الرعاية الصحية والتعليم والتجارة',
        'إدارة مشروع كاملة وإشراف ميداني',
      ],
      whatsappMessage: 'Hello, I would like to inquire about suspended ceiling system installation for my project.',
      whatsappMessageAr: 'مرحباً، أريد الاستفسار عن تركيب أنظمة الأسقف المعلقة لمشروعي.',
      status: 'PUBLISHED',
    },
    {
      title: 'Drywall & Partition Systems',
      titleAr: 'الجدران الجافة وأنظمة التقسيم',
      slug: 'drywall-partition-systems',
      description: 'Professional installation of gypsum board wall partitions, bulkheads, and cement board walls for high-moisture and heavy-duty areas. We deliver precise, clean, and durable partition solutions for all types of interior spaces.',
      descriptionAr: 'تركيب احترافي لحواجز الجدران الجبسية والعروق والجدران من ألواح الإسمنت للمناطق شديدة الرطوبة والاستخدام. نقدم حلول تقسيم دقيقة ونظيفة ومتينة لجميع أنواع المساحات الداخلية.',
      icon: 'Columns2',
      features: [
        'Gypsum board wall partitions & bulkheads',
        'Cement board installation for high-moisture areas',
        'Fire-resistant & acoustic partition solutions',
        'Precision layout measurement & planning',
        'Clean finishing, taping & jointing',
        'Suitable for offices, hospitals & residential spaces',
      ],
      featuresAr: [
        'حواجز جدران جبسية وعروق',
        'تركيب ألواح إسمنتية للمناطق شديدة الرطوبة',
        'حلول تقسيم مقاومة للحريق وعازلة للصوت',
        'قياس وتخطيط دقيق للموقع',
        'تشطيب نظيف وتسليح وربط',
        'مناسب للمكاتب والمستشفيات والمساحات السكنية',
      ],
      whatsappMessage: 'Hello, I need drywall and partition installation for my project.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى تركيب جدران جافة وتقسيمات لمشروعي.',
      status: 'PUBLISHED',
    },
    {
      title: 'Gypsum Finishing Works',
      titleAr: 'أعمال التشطيب الجبسي',
      slug: 'gypsum-finishing-works',
      description: 'Complete gypsum finishing services including taping, jointing, skimming, and smooth finishing. We prepare all surfaces to the highest standards, ensuring a flawless base ready for painting or final decoration.',
      descriptionAr: 'خدمات تشطيب جبسي كاملة تشمل التسليح والربط والتخفيف والتشطيب الأملس. نُعِدّ جميع الأسطح وفق أعلى المعايير لضمان قاعدة مثالية جاهزة للطلاء أو الديكور النهائي.',
      icon: 'PaintRoller',
      features: [
        'Taping, jointing & skimming',
        'Smooth wall & ceiling finishing',
        'Crack filling & surface repair',
        'Preparation for paint or wallpaper',
        'High-quality materials & workmanship',
        'Residential, commercial & institutional projects',
      ],
      featuresAr: [
        'تسليح وربط وتخفيف',
        'تشطيب أملس للجدران والأسقف',
        'حشو الشقوق وإصلاح الأسطح',
        'تجهيز للطلاء أو ورق الجدران',
        'مواد وعمالة عالية الجودة',
        'مشاريع سكنية وتجارية ومؤسسية',
      ],
      whatsappMessage: 'Hello, I need gypsum finishing works for my project.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى أعمال تشطيب جبسي لمشروعي.',
      status: 'PUBLISHED',
    },
    {
      title: 'Decorative Ceiling & Lighting Design',
      titleAr: 'تصميم الأسقف الزخرفية والإضاءة',
      slug: 'decorative-ceiling-lighting-design',
      description: 'We design and execute stunning modern ceiling designs including 3D patterns, coffered details, and integrated hidden LED lighting systems. From initial design concept to final execution, we transform ordinary spaces into exceptional interiors.',
      descriptionAr: 'نصمم وننفذ تصميمات أسقف عصرية مذهلة تشمل أنماطاً ثلاثية الأبعاد وتفاصيل منخفضة وأنظمة إضاءة LED خفية متكاملة. من مرحلة التصميم إلى التنفيذ النهائي، نحول المساحات العادية إلى ديكورات استثنائية.',
      icon: 'Lightbulb',
      features: [
        'Modern 3D ceiling design & renders',
        'Hidden LED lighting fixture design',
        'TV wall unit integration & design',
        'Custom decorative ceiling patterns',
        'Cove lighting & indirect lighting solutions',
        'Design-to-execution project management',
      ],
      featuresAr: [
        'تصميم وعرض ثلاثي الأبعاد للأسقف',
        'تصميم تركيبات إضاءة LED خفية',
        'تكامل وتصميم وحدات حائط التلفزيون',
        'أنماط أسقف زخرفية مخصصة',
        'حلول إضاءة كوف وإضاءة غير مباشرة',
        'إدارة المشروع من التصميم إلى التنفيذ',
      ],
      whatsappMessage: 'Hello, I am interested in decorative ceiling and lighting design for my space.',
      whatsappMessageAr: 'مرحباً، أرغب في تصميم أسقف زخرفية وإضاءة لمساحتي.',
      status: 'PUBLISHED',
    },
    {
      title: 'Aluminum Ceiling Systems',
      titleAr: 'أنظمة الأسقف الألومنيوم',
      slug: 'aluminum-ceiling-systems',
      description: 'Specialized installation of aluminum and metal tile suspended ceiling systems for healthcare, educational, and commercial facilities. These systems offer superior durability, moisture resistance, fire protection, and a clean modern aesthetic ideal for high-demand environments.',
      descriptionAr: 'تركيب متخصص لأنظمة الأسقف المعلقة من الألومنيوم والألواح المعدنية لمرافق الرعاية الصحية والتعليم والتجارة. توفر هذه الأنظمة متانة فائقة ومقاومة للرطوبة والحريق وجمالية عصرية نظيفة مثالية للبيئات عالية الطلب.',
      icon: 'Building2',
      features: [
        'Aluminum & metal tile ceiling installation',
        'Warp, crack & moisture resistant',
        'Fire-resistant & hygienic (ideal for healthcare)',
        'Lightweight with modern clean aesthetics',
        'Long lifespan & easy maintenance',
        'Ideal for hospitals, schools & commercial spaces',
      ],
      featuresAr: [
        'تركيب أسقف من الألومنيوم والألواح المعدنية',
        'مقاومة للتشوه والتشقق والرطوبة',
        'مقاومة للحريق وصحية (مثالية للرعاية الصحية)',
        'خفيفة الوزن بجمالية عصرية نظيفة',
        'عمر افتراضي طويل وصيانة سهلة',
        'مثالية للمستشفيات والمدارس والمساحات التجارية',
      ],
      whatsappMessage: 'Hello, I need aluminum ceiling system installation for a commercial or healthcare facility.',
      whatsappMessageAr: 'مرحباً، أحتاج تركيب نظام سقف ألومنيوم لمنشأة تجارية أو رعاية صحية.',
      status: 'PUBLISHED',
    },
    {
      title: 'Project Management & Site Coordination',
      titleAr: 'إدارة المشاريع والتنسيق الميداني',
      slug: 'project-management-site-coordination',
      description: 'Full-scope project management for large interior fit-out and finishing works. From initial layout measurement and planning to full site supervision and final delivery — we ensure every project is completed on time, within budget, and to the highest quality standards.',
      descriptionAr: 'إدارة شاملة للمشاريع لأعمال التشطيبات الداخلية والتجهيزات الكبيرة. من القياس الأولي والتخطيط إلى الإشراف الميداني الكامل والتسليم النهائي — نضمن إنجاز كل مشروع في الوقت المحدد وضمن الميزانية ووفق أعلى معايير الجودة.',
      icon: 'ClipboardList',
      features: [
        'Full site supervision & layout measurement',
        'Detailed project planning & scheduling',
        'Material procurement & quality control',
        'Safety compliance (helmet, boots, jacket)',
        'Progress reporting & client communication',
        'On-time delivery guarantee',
      ],
      featuresAr: [
        'إشراف ميداني كامل وقياس المخطط',
        'تخطيط وجدولة تفصيلية للمشروع',
        'شراء المواد ومراقبة الجودة',
        'الامتثال للسلامة (خوذة، أحذية، سترة)',
        'تقارير تقدم المشروع والتواصل مع العميل',
        'ضمان التسليم في الوقت المحدد',
      ],
      whatsappMessage: 'Hello, I need project management and site coordination for my interior fit-out project.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى إدارة مشروع وتنسيق ميداني لمشروع التشطيب الداخلي الخاص بي.',
      status: 'PUBLISHED',
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }
  console.log(`  ✓ Created ${services.length} Services`)

  // ─────────────────────────────────────────────
  // 3. TRUST FEATURES
  // ─────────────────────────────────────────────
  console.log('⭐ Seeding Trust Features...')
  await prisma.trustFeature.deleteMany({})

  const trustFeatures = [
    {
      title: '8+ Years of Experience',
      titleAr: '+8 سنوات خبرة',
      description: 'Over 8 years of specialized experience in suspended ceilings, drywall partitions, and interior fit-out across Saudi Arabia.',
      descriptionAr: 'أكثر من 8 سنوات من الخبرة المتخصصة في الأسقف المعلقة والجدران الجافة والتشطيبات الداخلية في جميع أنحاء المملكة.',
      icon: 'BadgeCheck',
      order: 1,
    },
    {
      title: 'Large-Scale Project Expertise',
      titleAr: 'خبرة في المشاريع الكبرى',
      description: 'Proven track record on large projects including Dalma Humanity City Hospital (25,000+ sqm) and Northern College of Nursing (18,000+ sqm).',
      descriptionAr: 'سجل حافل في مشاريع كبرى منها مستشفى مدينة الدلما الإنسانية (+25,000 م²) وكلية التمريض الشمالية (+18,000 م²).',
      icon: 'Building2',
      order: 2,
    },
    {
      title: '100% Safety Record',
      titleAr: 'سجل سلامة 100%',
      description: 'Zero accidents on all project sites. Our team works in full compliance with safety regulations — helmets, boots, and safety jackets always worn.',
      descriptionAr: 'صفر حوادث في جميع مواقع المشاريع. يعمل فريقنا بالتزام كامل بأنظمة السلامة — خوذات وأحذية وسترات أمان دائماً.',
      icon: 'ShieldCheck',
      order: 3,
    },
    {
      title: 'On-Time Delivery',
      titleAr: 'تسليم في الموعد',
      description: 'Strong project management ensuring strict adherence to timelines. We commit to deadlines and deliver what we promise.',
      descriptionAr: 'إدارة مشاريع قوية تضمن الالتزام الصارم بالجداول الزمنية. نلتزم بالمواعيد النهائية ونسلم ما نعد به.',
      icon: 'Timer',
      order: 4,
    },
    {
      title: 'Precision & Custom Design',
      titleAr: 'الدقة والتصميم المخصص',
      description: 'We provide custom 3D design coordination before execution, ensuring every detail is planned and delivered to specification.',
      descriptionAr: 'نقدم تنسيق تصميم ثلاثي الأبعاد مخصص قبل التنفيذ لضمان تخطيط كل تفصيلة وتسليمها وفق المواصفات.',
      icon: 'Ruler',
      order: 5,
    },
    {
      title: 'Quality Materials',
      titleAr: 'مواد عالية الجودة',
      description: 'We use only certified, high-grade gypsum, cement, and aluminum materials — moisture-resistant, fire-resistant, acoustic, and impact-resistant boards as required.',
      descriptionAr: 'نستخدم فقط مواد جبسية وإسمنتية وألومنيوم معتمدة وعالية الجودة — مقاومة للرطوبة والحريق وعازلة للصوت ومقاومة للصدمات حسب المتطلبات.',
      icon: 'Gem',
      order: 6,
    },
  ]

  for (const tf of trustFeatures) {
    await prisma.trustFeature.create({ data: tf })
  }
  console.log(`  ✓ Created ${trustFeatures.length} Trust Features`)

  // ─────────────────────────────────────────────
  // 4. STAT COUNTERS
  // ─────────────────────────────────────────────
  console.log('📊 Seeding Stat Counters...')
  await prisma.statCounter.deleteMany({})

  const stats = [
    { label: 'Years of Experience', labelAr: 'سنوات الخبرة', value: '8+', valueAr: '+8', icon: 'Calendar', order: 1 },
    { label: 'SQM Gypsum Ceiling (Dalma Hospital)', labelAr: 'م² سقف جبسي (مستشفى الدلما)', value: '25,000+', valueAr: '+25,000', icon: 'AreaChart', order: 2 },
    { label: 'SQM Ceiling (Nursing College)', labelAr: 'م² سقف (كلية التمريض)', value: '18,000+', valueAr: '+18,000', icon: 'School', order: 3 },
    { label: 'Skilled Professionals', labelAr: 'كادر متخصص', value: '15+', valueAr: '+15', icon: 'HardHat', order: 4 },
  ]

  for (const stat of stats) {
    await prisma.statCounter.create({ data: stat })
  }
  console.log(`  ✓ Created ${stats.length} Stat Counters`)

  // ─────────────────────────────────────────────
  // 5. TESTIMONIALS
  // ─────────────────────────────────────────────
  console.log('💬 Seeding Testimonials...')
  await prisma.testimonial.deleteMany({})

  const testimonials = [
    {
      clientName: 'Eng. Abdullah Al-Shammari',
      clientNameAr: 'م. عبدالله الشمري',
      clientLocation: 'Project Manager – Dalma Humanity City, Arar',
      clientLocationAr: 'مدير مشروع – مدينة الدلما الإنسانية، عرعر',
      clientTitle: 'Project Manager',
      content: "Hedayetullah's team executed over 25,000 sqm of suspended gypsum ceiling at our hospital project with remarkable precision and within the tight project schedule. Their professionalism, safety compliance, and quality of finish exceeded our expectations.",
      contentAr: 'نفذ فريق هدايت الله أكثر من 25,000 م² من الأسقف الجبسية المعلقة في مشروع مستشفانا بدقة ملحوظة وضمن الجدول الزمني الضيق للمشروع. تجاوز احترافيتهم والتزامهم بالسلامة وجودة التشطيب توقعاتنا.',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      clientName: 'Dr. Fatima Al-Rashidi',
      clientNameAr: 'د. فاطمة الراشدي',
      clientLocation: 'Northern College of Nursing, Arar',
      clientLocationAr: 'كلية التمريض الشمالية، عرعر',
      clientTitle: 'Facilities Director',
      content: 'We contracted Hedayetullah Studio for 18,000 sqm of ceiling installation across our nursing college facilities. The work was completed on time, the materials were top quality, and the site was always clean and organized. We will definitely work with them again.',
      contentAr: 'تعاقدنا مع استوديو هدايت الله لتركيب 18,000 م² من الأسقف في منشآت كلية التمريض. أُنجز العمل في الوقت المحدد والمواد كانت عالية الجودة والموقع دائماً نظيف ومنظم. سنتعاون معهم بالتأكيد مجدداً.',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      clientName: 'Khalid Al-Otaibi',
      clientNameAr: 'خالد العتيبي',
      clientLocation: 'Commercial Property Developer, Northern Province',
      clientLocationAr: 'مطور عقارات تجارية، المنطقة الشمالية',
      clientTitle: 'Property Developer',
      content: 'Outstanding interior fit-out work for our commercial complex. The 3D ceiling design they proposed was exactly what we envisioned, and the execution was flawless. Their team is professional, punctual, and deeply skilled.',
      contentAr: 'أعمال تشطيب داخلي متميزة لمجمعنا التجاري. تصميم السقف ثلاثي الأبعاد الذي اقترحوه كان بالضبط ما تصورناه، والتنفيذ كان مثالياً. فريقهم محترف ومنضبط وذو مهارة عالية.',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      clientName: 'Mohammed Al-Anazi',
      clientNameAr: 'محمد العنزي',
      clientLocation: 'Villa Owner, Arar',
      clientLocationAr: 'صاحب فيلا، عرعر',
      clientTitle: 'Homeowner',
      content: 'I hired them for all gypsum ceiling and partition work in my new villa. The hidden LED lighting design they created is absolutely beautiful. Every detail was handled perfectly. Highly satisfied with the results.',
      contentAr: 'استعنت بهم لجميع أعمال الأسقف الجبسية والتقسيمات في فيلتي الجديدة. تصميم إضاءة LED الخفية الذي أنجزوه جميل للغاية. كل تفصيلة نُفذت بشكل مثالي. راضٍ جداً عن النتائج.',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log(`  ✓ Created ${testimonials.length} Testimonials`)

  // ─────────────────────────────────────────────
  // 6. FAQs
  // ─────────────────────────────────────────────
  console.log('❓ Seeding FAQs...')
  await prisma.fAQ.deleteMany({})

  const faqs = [
    {
      question: 'What areas do you serve?',
      questionAr: 'ما هي المناطق التي تخدمونها؟',
      answer: 'We are based in Arar, Northern Frontier Province, and operate across the Kingdom of Saudi Arabia. We take on large-scale projects throughout the country including healthcare facilities, educational institutions, commercial complexes, and residential projects.',
      answerAr: 'مقرنا في عرعر بمنطقة الحدود الشمالية ونعمل في جميع أنحاء المملكة العربية السعودية. نتولى مشاريع كبرى في أرجاء المملكة تشمل المرافق الصحية والمؤسسات التعليمية والمجمعات التجارية والمشاريع السكنية.',
      status: 'PUBLISHED',
    },
    {
      question: 'What types of gypsum boards do you use?',
      questionAr: 'ما أنواع ألواح الجبس التي تستخدمونها؟',
      answer: 'We work with all certified gypsum board types depending on the project requirements: Standard boards for general areas, Moisture-Resistant (Green Face) for bathrooms and kitchens, Fire-Resistant (Pink/Red Face) for high-temperature zones, Fire & Moisture Resistant boards for critical structural areas, Acoustic boards for sound insulation, and Impact-Resistant boards for high-traffic zones like hospitals and corridors.',
      answerAr: 'نعمل بجميع أنواع ألواح الجبس المعتمدة بحسب متطلبات المشروع: الألواح القياسية للمناطق العامة، والمقاومة للرطوبة (الوجه الأخضر) للحمامات والمطابخ، والمقاومة للحريق (الوجه الوردي/الأحمر) للمناطق عالية الحرارة، وألواح الحريق والرطوبة المزدوجة للمناطق الإنشائية الحرجة، والألواح الصوتية للعزل الصوتي، والألواح المقاومة للصدمات لمناطق الحركة المكثفة كالمستشفيات والممرات.',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you handle large-scale commercial and healthcare projects?',
      questionAr: 'هل تتولون مشاريع تجارية وصحية كبرى؟',
      answer: 'Yes, this is our core specialty. We have successfully completed large-scale projects including 25,000+ sqm of gypsum ceiling at Dalma Humanity City Hospital and 18,000+ sqm of ceiling installation at Northern College of Nursing in Arar. We have the workforce, equipment, and project management experience for any scale.',
      answerAr: 'نعم، هذا هو تخصصنا الأساسي. أنجزنا بنجاح مشاريع كبرى منها أكثر من 25,000 م² من الأسقف الجبسية في مستشفى مدينة الدلما الإنسانية وأكثر من 18,000 م² من الأسقف في كلية التمريض الشمالية بعرعر. لدينا الكوادر والمعدات وخبرة إدارة المشاريع لأي حجم.',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you offer 3D ceiling design before starting work?',
      questionAr: 'هل تقدمون تصميماً ثلاثي الأبعاد للسقف قبل بدء العمل؟',
      answer: 'Yes! For decorative and custom ceiling projects, we provide detailed 3D design renders before execution begins. This ensures you can visualize the final result, request any changes, and approve the design before a single board is installed.',
      answerAr: 'نعم! بالنسبة لمشاريع الأسقف الزخرفية والمخصصة، نقدم مخططات تصميم ثلاثية الأبعاد تفصيلية قبل بدء التنفيذ. يتيح لك ذلك تصور النتيجة النهائية وطلب أي تعديلات والموافقة على التصميم قبل تركيب أي لوح.',
      status: 'PUBLISHED',
    },
    {
      question: 'What is your safety standard on project sites?',
      questionAr: 'ما هو معيار السلامة الذي تطبقونه في مواقع المشاريع؟',
      answer: 'We maintain a 100% safety record with zero accidents across all our project sites. Our team works in full compliance with all safety regulations — all workers wear safety jackets, helmets, and safety boots at all times. We conduct site safety briefings before starting any project.',
      answerAr: 'نحافظ على سجل سلامة بنسبة 100% مع صفر حوادث في جميع مواقع مشاريعنا. يعمل فريقنا بالتزام كامل بجميع أنظمة السلامة — يرتدي جميع العمال سترات وخوذات وأحذية السلامة في جميع الأوقات. نجري إحاطات سلامة الموقع قبل البدء بأي مشروع.',
      status: 'PUBLISHED',
    },
    {
      question: 'What is the advantage of aluminum ceiling systems over gypsum?',
      questionAr: 'ما ميزة أنظمة الأسقف الألومنيوم على الجبس؟',
      answer: 'Aluminum ceiling systems offer several key advantages over standard gypsum for certain environments: they are warp and crack resistant, completely moisture-proof, hygienic and easy to clean (ideal for healthcare), fire-resistant, lightweight, and have a very long lifespan with minimal maintenance. They are particularly recommended for hospitals, medical centers, schools, and commercial facilities.',
      answerAr: 'توفر أنظمة الأسقف الألومنيوم عدة مزايا رئيسية على الجبس القياسي في بيئات معينة: فهي مقاومة للتشوه والتشقق، ومضادة تماماً للرطوبة، وصحية وسهلة التنظيف (مثالية للرعاية الصحية)، ومقاومة للحريق، وخفيفة الوزن، وذات عمر افتراضي طويل جداً مع صيانة بسيطة. يُوصى بها بشكل خاص للمستشفيات والمراكز الطبية والمدارس والمرافق التجارية.',
      status: 'PUBLISHED',
    },
    {
      question: 'How do I request a quote for my project?',
      questionAr: 'كيف أطلب عرض سعر لمشروعي؟',
      answer: 'The fastest way is to contact us via WhatsApp at +966531285984. Share your project details, drawings, or site photos and we will provide a detailed, competitive price quote. You can also reach us by phone or email at hedayetullah102@gmail.com.',
      answerAr: 'أسرع طريقة هي التواصل معنا عبر واتساب على الرقم +966531285984. شاركنا تفاصيل مشروعك والرسومات أو صور الموقع وسنقدم لك عرض سعر تفصيلياً وتنافسياً. يمكنك أيضاً التواصل معنا هاتفياً أو عبر البريد الإلكتروني hedayetullah102@gmail.com.',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you handle residential villa and apartment projects?',
      questionAr: 'هل تتولون مشاريع الفيلات والشقق السكنية؟',
      answer: 'Absolutely. In addition to large commercial and institutional projects, we work on all types of residential spaces including villas, apartments, and housing complexes. We bring the same precision, quality materials, and professional finish to every project, big or small.',
      answerAr: 'بالتأكيد. بالإضافة إلى المشاريع التجارية والمؤسسية الكبيرة، نعمل على جميع أنواع المساحات السكنية بما فيها الفيلات والشقق والمجمعات السكنية. نقدم نفس الدقة والمواد الجيدة والتشطيب الاحترافي في كل مشروع صغيراً كان أم كبيراً.',
      status: 'PUBLISHED',
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq })
  }
  console.log(`  ✓ Created ${faqs.length} FAQs`)

  // ─────────────────────────────────────────────
  // 7. BRAND LOGOS
  // ─────────────────────────────────────────────
  console.log('🏷️  Seeding Brand Logos...')
  await prisma.brandLogo.deleteMany({})

  const brands = [
    {
      name: 'Gyproc (Saint-Gobain)',
      nameAr: 'جيبروك (سانت غوبان)',
      imageUrl: 'https://logo.clearbit.com/saint-gobain.com',
      url: 'https://www.gyproc.com',
      order: 1,
      status: 'PUBLISHED',
    },
    {
      name: 'Armstrong Ceilings',
      nameAr: 'أرمسترونج للأسقف',
      imageUrl: 'https://logo.clearbit.com/armstrongceilings.com',
      url: 'https://www.armstrongceilings.com',
      order: 2,
      status: 'PUBLISHED',
    },
    {
      name: 'USG Corporation',
      nameAr: 'يو إس جي',
      imageUrl: 'https://logo.clearbit.com/usg.com',
      url: 'https://www.usg.com',
      order: 3,
      status: 'PUBLISHED',
    },
    {
      name: 'Knauf',
      nameAr: 'كناوف',
      imageUrl: 'https://logo.clearbit.com/knauf.com',
      url: 'https://www.knauf.com',
      order: 4,
      status: 'PUBLISHED',
    },
    {
      name: 'Hunter Douglas',
      nameAr: 'هنتر دوغلاس',
      imageUrl: 'https://logo.clearbit.com/hunterdouglas.com',
      url: 'https://www.hunterdouglas.com',
      order: 5,
      status: 'PUBLISHED',
    },
    {
      name: 'Boral',
      nameAr: 'بورال',
      imageUrl: 'https://logo.clearbit.com/boral.com',
      url: 'https://www.boral.com',
      order: 6,
      status: 'PUBLISHED',
    },
  ]

  for (const brand of brands) {
    await prisma.brandLogo.create({ data: brand })
  }
  console.log(`  ✓ Created ${brands.length} Brand Logos`)

  // ─────────────────────────────────────────────
  // 8. GALLERY ITEMS
  // ─────────────────────────────────────────────
  console.log('🖼️  Seeding Gallery Items...')
  await prisma.galleryItem.deleteMany({})

  const galleryItems = [
    {
      title: 'Suspended Gypsum Ceiling – Hospital Corridor',
      titleAr: 'سقف جبسي معلق – ممر مستشفى',
      caption: 'Large-scale suspended gypsum ceiling installation across the main hospital corridor. Delivered on schedule with full safety compliance.',
      captionAr: 'تركيب سقف جبسي معلق واسع النطاق عبر ممر المستشفى الرئيسي. تم التسليم في الموعد المحدد مع الالتزام الكامل بمعايير السلامة.',
      imageUrl: 'https://images.unsplash.com/photo-1562591894-4e02c5e32ec0?w=800&q=80',
      serviceType: 'INSTALLATION',
      status: 'PUBLISHED',
    },
    {
      title: 'Drywall Partition System – Commercial Office',
      titleAr: 'نظام تقسيم الجدران الجافة – مكتب تجاري',
      caption: 'Full drywall partition system installed for a multi-room open-plan office, including cable management and finishing.',
      captionAr: 'تم تركيب نظام تقسيم الجدران الجافة الكامل لمكتب متعدد الغرف، بما في ذلك إدارة الكابلات والتشطيب.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      serviceType: 'INSTALLATION',
      status: 'PUBLISHED',
    },
    {
      title: 'Decorative Cornice & Recessed Lighting',
      titleAr: 'قرنيش ديكوري وإضاءة مدمجة',
      caption: 'Before & after transformation: decorative gypsum cornice and recessed LED lighting design for a luxury villa living room.',
      captionAr: 'تحول قبل وبعد: قرنيش جبسي ديكوري وتصميم إضاءة LED مدمجة لغرفة معيشة فيلا فاخرة.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      serviceType: 'INSTALLATION',
      status: 'PUBLISHED',
    },
    {
      title: 'Aluminum Grid Ceiling – Healthcare Facility',
      titleAr: 'سقف شبكة ألومنيوم – منشأة رعاية صحية',
      caption: 'Precision aluminum grid ceiling installation for a healthcare facility, designed for easy access to MEP services.',
      captionAr: 'تركيب سقف شبكة ألومنيوم بدقة عالية لمنشأة رعاية صحية، مصمم لسهولة الوصول إلى خدمات MEP.',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      serviceType: 'INSTALLATION',
      status: 'PUBLISHED',
    },
    {
      title: 'Gypsum Finishing – Luxury Villa',
      titleAr: 'تشطيب جبسي – فيلا فاخرة',
      caption: 'High-end gypsum plastering and finishing work throughout a luxury residential villa in Arar.',
      captionAr: 'أعمال تلبيس وتشطيب جبسي راقية في جميع أنحاء فيلا سكنية فاخرة في عرعر.',
      imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      serviceType: 'INSTALLATION',
      status: 'PUBLISHED',
    },
    {
      title: 'Acoustic Partition Board – Conference Room',
      titleAr: 'لوح تقسيم صوتي – قاعة مؤتمرات',
      caption: 'Acoustic partition boards installed to create a sound-isolated conference room within an open office plan.',
      captionAr: 'تم تركيب ألواح التقسيم الصوتي لإنشاء قاعة مؤتمرات معزولة صوتياً ضمن مخطط مكتب مفتوح.',
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      serviceType: 'INSTALLATION',
      status: 'PUBLISHED',
    },
    {
      title: 'Ceiling Maintenance – Cracked Panel Repair',
      titleAr: 'صيانة السقف – إصلاح الألواح المتشققة',
      caption: 'Before & after ceiling maintenance work: cracked and damaged gypsum panels fully repaired and refinished to like-new condition.',
      captionAr: 'صيانة السقف قبل وبعد: تم إصلاح الألواح الجبسية المتشققة والتالفة بالكامل وإعادة تشطيبها.',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
      beforeImageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      serviceType: 'MAINTENANCE',
      status: 'PUBLISHED',
    },
    {
      title: 'Full Ceiling Dismantling – Renovation Project',
      titleAr: 'فك السقف بالكامل – مشروع تجديد',
      caption: 'Safe and efficient dismantling of an existing false ceiling system prior to a full renovation, with complete debris removal.',
      captionAr: 'فك آمن وفعال لنظام السقف الكاذب الحالي قبل التجديد الكامل، مع إزالة كاملة للركام.',
      imageUrl: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&q=80',
      serviceType: 'DISMANTLING',
      status: 'PUBLISHED',
    },
  ]

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item })
  }
  console.log(`  ✓ Created ${galleryItems.length} Gallery Items`)

  // ─────────────────────────────────────────────
  // 9. VIDEO REELS
  // ─────────────────────────────────────────────
  console.log('🎬 Seeding Video Reels...')
  await prisma.videoReel.deleteMany({})

  const videos = [
    {
      title: 'Suspended Gypsum Ceiling Installation – Step by Step',
      titleAr: 'تركيب السقف الجبسي المعلق خطوة بخطوة',
      caption: 'Watch our skilled team execute a full suspended gypsum ceiling system from framework to finishing.',
      captionAr: 'شاهد فريقنا المهاري ينفذ نظام سقف جبسي معلق كامل من الهيكل إلى التشطيب.',
      youtubeUrl: 'https://www.youtube.com/watch?v=TfVFkDJJmAc',
      videoId: 'TfVFkDJJmAc',
      category: 'INSTALLATION',
      order: 1,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      title: 'Drywall Partition System – Commercial Project',
      titleAr: 'نظام الجدران الجافة – مشروع تجاري',
      caption: 'Professional drywall partition installation for a large commercial project, showing speed and precision.',
      captionAr: 'تركيب احترافي لنظام الجدران الجافة في مشروع تجاري كبير يُظهر السرعة والدقة.',
      youtubeUrl: 'https://www.youtube.com/watch?v=aFcHtFbmHZI',
      videoId: 'aFcHtFbmHZI',
      category: 'INSTALLATION',
      order: 2,
      featured: false,
      status: 'PUBLISHED',
    },
    {
      title: 'Before & After – Ceiling Transformation',
      titleAr: 'قبل وبعد – تحول السقف',
      caption: 'An impressive transformation: from a bare concrete ceiling to a fully finished decorative gypsum masterpiece.',
      captionAr: 'تحول مذهل: من سقف خرساني عارٍ إلى تحفة جبسية ديكورية مكتملة التشطيب.',
      youtubeUrl: 'https://www.youtube.com/watch?v=RNKF_2bDkrg',
      videoId: 'RNKF_2bDkrg',
      category: 'TRANSFORMATION',
      order: 3,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      title: 'Aluminum Ceiling Grid – Hospital Project in Progress',
      titleAr: 'شبكة سقف ألومنيوم – مشروع مستشفى قيد التنفيذ',
      caption: 'Live footage of our team installing an aluminum ceiling grid system across a major healthcare facility.',
      captionAr: 'لقطات مباشرة لفريقنا يقوم بتركيب نظام شبكة سقف ألومنيوم عبر منشأة رعاية صحية كبرى.',
      youtubeUrl: 'https://www.youtube.com/watch?v=MIxbMHBk6lo',
      videoId: 'MIxbMHBk6lo',
      category: 'WORKING',
      order: 4,
      featured: false,
      status: 'PUBLISHED',
    },
    {
      title: 'Completed Project – Premium Villa Interior Finishing',
      titleAr: 'مشروع مكتمل – تشطيبات داخلية فاخرة لفيلا',
      caption: 'Final walkthrough of a completed luxury villa project featuring decorative ceilings, cornices, and full gypsum finishing.',
      captionAr: 'جولة نهائية لمشروع فيلا فاخرة مكتمل يتضمن أسقفاً ديكورية وقرنيشات وتشطيبات جبسية كاملة.',
      youtubeUrl: 'https://www.youtube.com/watch?v=UIOHPEq65DM',
      videoId: 'UIOHPEq65DM',
      category: 'COMPLETED',
      order: 5,
      featured: false,
      status: 'PUBLISHED',
    },
  ]

  for (const video of videos) {
    await prisma.videoReel.create({ data: video })
  }
  console.log(`  ✓ Created ${videos.length} Video Reels`)

  console.log('\n✅ All content seeded successfully!')
  console.log('\nSummary:')
  console.log('  - Site Settings: Updated')
  console.log(`  - Services: ${services.length}`)
  console.log(`  - Trust Features: ${trustFeatures.length}`)
  console.log(`  - Stat Counters: ${stats.length}`)
  console.log(`  - Testimonials: ${testimonials.length}`)
  console.log(`  - FAQs: ${faqs.length}`)
  console.log(`  - Brand Logos: ${brands.length}`)
  console.log(`  - Gallery Items: ${galleryItems.length}`)
  console.log(`  - Video Reels: ${videos.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
