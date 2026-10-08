// Slide copy for the Zajel solution carousels, English + Arabic.
// **text** marks the accent phrase. Items made with `confirm()` are claims
// Zajel must confirm before publishing (flagged ⚑ in content.md, not rendered).

const t = (en, ar) => ({ en, ar });
const confirm = (en, ar) => ({ en, ar, confirm: true });

const series = {
  individual: t('Individual', 'الأفراد'),
  business: t('Business', 'الأعمال'),
  secure: t('Secure', 'الخدمات الآمنة'),
};

const ui = {
  challenge: t('The challenge', 'التحدي'),
  included: t("What's included", 'ما تشمله الخدمة'),
  how: t('How it works', 'آلية العمل'),
  why: t('Why Zajel', 'لماذا زاجل'),
  swipe: t('Swipe', 'اسحب'),
  contact: 'info@zajel.com',
};

const cta = {
  individual: t('Delivery, **done intelligently.**', 'توصيلٌ **يُنجَز بذكاء.**'),
  growing: t('Intelligent movement **for growing businesses.**', 'حركة ذكية **للأعمال المتنامية.**'),
  complex: t('Intelligent movement **for complex operations.**', 'حركة ذكية **للعمليات المعقّدة.**'),
  secure: t('Intelligent movement, **in trusted hands.**', 'حركة ذكية، **بأيدٍ أمينة.**'),
};

const button = {
  pickup: t('Request a pickup', 'اطلب خدمة الاستلام'),
  quote: t('Request a quote', 'اطلب عرض سعر'),
  team: t('Contact our team', 'تواصل مع فريقنا'),
};

const carousels = [
  {
    id: 'on-demand-express',
    series: 'individual',
    name: t('On Demand Express', 'التوصيل السريع عند الطلب'),
    slides: [
      {
        type: 'cover',
        photo: { src: 'courier-van.jpg', position: '30% 30%', positionAr: '100% 30%' },
        panel: 'dark',
        title: t('When timing is critical, **precision matters.**', 'حين يكون التوقيت حاسماً، **تصنع الدقة الفارق.**'),
        sub: t('Instant solutions for urgent deliveries.', 'حلول فورية للتوصيل العاجل.'),
      },
      {
        type: 'statement',
        theme: 'green',
        text: t(
          'Urgent deliveries leave no room for delay. They require **a fast response, clear coordination and full visibility.**',
          'التوصيل العاجل لا يحتمل أي تأخير، ويتطلب **استجابة سريعة وتنسيقاً واضحاً ورؤية كاملة.**',
        ),
      },
      {
        type: 'list',
        theme: 'white',
        title: t('Immediate delivery for **urgent documents and parcels.**', 'توصيل فوري **للوثائق والطرود العاجلة.**'),
        items: [
          { icon: 'zap', text: t('Rapid pickup from your location', 'استلام سريع من موقعك') },
          { icon: 'route', text: confirm('Direct delivery to the recipient', 'توصيل مباشر إلى المستلم') },
          { icon: 'radar', text: t('Live tracking at every step', 'تتبّع لحظي في كل خطوة') },
          { icon: 'smartphone', text: confirm('Booking through the Zajel app', 'الحجز عبر تطبيق زاجل') },
        ],
      },
      {
        type: 'steps',
        theme: 'dark',
        title: t('Simple to book. **Fast to deliver.**', 'حجز سهل، **وتوصيل سريع.**'),
        steps: [
          { text: confirm('Book your delivery in the Zajel app', 'احجز التوصيل عبر تطبيق زاجل') },
          { text: t('We collect from your location', 'نستلم الشحنة من موقعك') },
          { text: t('Delivered directly, tracked live', 'نسلّمها مباشرة مع تتبّع لحظي') },
        ],
      },
      {
        type: 'why',
        theme: 'green',
        items: [
          { icon: 'timer', text: t('Responsive service from booking to delivery', 'استجابة سريعة من الحجز حتى التسليم') },
          { icon: 'radar', text: t('Real-time visibility at every step', 'رؤية لحظية في كل خطوة') },
          { icon: 'headset', text: t('A dedicated team that performs under pressure', 'فريق متخصص يعمل بثبات تحت الضغط') },
        ],
      },
      { type: 'cta', theme: 'dark', title: cta.individual, button: button.pickup },
    ],
  },

  {
    id: 'international-shipping',
    series: 'individual',
    name: t('International Shipping', 'الشحن الدولي'),
    slides: [
      {
        type: 'cover',
        photo: { src: 'app-tracking.jpg', position: '42% 20%', positionAr: '0% 20%' },
        panel: 'green',
        title: t('Global reach, **backed by local expertise.**', 'انتشار عالمي، **تدعمه خبرة محلية.**'),
        sub: t('Documents and parcels, delivered worldwide.', 'وثائق وطرود تصل إلى جميع أنحاء العالم.'),
      },
      {
        type: 'statement',
        theme: 'dark',
        text: t(
          'International shipments involve regulations, documentation and duties **that vary by destination.**',
          'تخضع الشحنات الدولية لأنظمة ووثائق ورسوم **تختلف من وجهة إلى أخرى.**',
        ),
      },
      {
        type: 'list',
        theme: 'white',
        title: t('Worldwide delivery, **handled end to end.**', 'توصيل عالمي **بإدارة متكاملة.**'),
        items: [
          { icon: 'globe', text: confirm('Worldwide coverage', 'تغطية عالمية') },
          { icon: 'house', text: confirm('Door-to-door service', 'خدمة من الباب إلى الباب') },
          { icon: 'radar', text: t('International shipment tracking', 'تتبّع دولي للشحنات') },
          { icon: 'file-text', text: t('Customs documentation support', 'دعم في إعداد الوثائق الجمركية') },
        ],
      },
      {
        type: 'steps',
        theme: 'green',
        title: t('From quote **to delivery.**', 'من عرض السعر **حتى التسليم.**'),
        steps: [
          { text: confirm('Receive a clear quote before you ship', 'احصل على عرض سعر واضح قبل الشحن') },
          { text: t('We collect your shipment and prepare the documents', 'نستلم شحنتك ونجهّز وثائقها') },
          { text: t('Track it through to final delivery', 'تابعها حتى التسليم النهائي') },
        ],
      },
      {
        type: 'why',
        theme: 'mist',
        items: [
          { icon: 'banknote', text: confirm('Transparent pricing before you ship', 'أسعار واضحة قبل الشحن') },
          { icon: 'globe', text: confirm('Regional knowledge, global network', 'خبرة إقليمية وشبكة عالمية') },
          { icon: 'package-check', text: t('Shipments tracked to final delivery', 'تتبّع الشحنات حتى التسليم النهائي') },
        ],
      },
      { type: 'cta', theme: 'dark', title: cta.individual, button: button.quote },
    ],
  },

  {
    id: 'ecommerce',
    series: 'business',
    name: t('Ecommerce', 'التجارة الإلكترونية'),
    slides: [
      {
        type: 'cover',
        photo: { src: 'parcel-doorstep.jpg', position: '55% 35%' },
        panel: 'green',
        title: t('End-to-end delivery for **growing online businesses.**', 'حلول توصيل متكاملة **للأعمال الإلكترونية المتنامية.**'),
        sub: t('First, mid and last-mile perfection.', 'إتقان في الميل الأول والأوسط والأخير.'),
      },
      {
        type: 'statement',
        theme: 'dark',
        text: t(
          'Delivery is part of the customer experience. **Every order reflects on your brand.**',
          'التوصيل جزء من تجربة العميل، **وكل طلب ينعكس على علامتك التجارية.**',
        ),
      },
      {
        type: 'steps',
        theme: 'white',
        eyebrow: t('Every mile', 'كل ميل'),
        title: t('Every mile, **covered.**', 'نغطّي **كل ميل.**'),
        steps: [
          { label: t('First mile', 'الميل الأول'), text: t('Pickup from your store or warehouse', 'الاستلام من متجرك أو مستودعك') },
          { label: t('Mid mile', 'الميل الأوسط'), text: t('Sorting and line-haul', 'الفرز والنقل بين المراكز') },
          { label: t('Last mile', 'الميل الأخير'), text: t("Delivery to your customer's door", 'التوصيل إلى باب عميلك') },
        ],
      },
      {
        type: 'detail',
        theme: 'mist',
        icon: 'hand-coins',
        eyebrow: t('Payments', 'المدفوعات'),
        title: t('Cash on delivery, **settled faster.**', 'الدفع عند الاستلام، **بتسوية أسرع.**'),
        pills: [
          confirm('Instant COD payout', 'تحويل فوري لمبالغ الدفع عند الاستلام'),
          confirm('Zajel Pay', 'Zajel Pay'),
          t('Faster cash flow', 'تدفّق نقدي أسرع'),
        ],
      },
      {
        type: 'why',
        theme: 'green',
        items: [
          { icon: 'radar', text: t('360° shipment visibility', 'رؤية شاملة \u2066360°\u2069 للشحنات') },
          { icon: 'route', text: t('AI-optimised routing', 'توجيه محسَّن بالذكاء الاصطناعي') },
          { icon: 'package-check', text: t('One partner across every mile', 'شريك واحد في كل ميل') },
        ],
      },
      { type: 'cta', theme: 'dark', title: cta.growing, button: button.quote },
    ],
  },

  {
    id: 'freight',
    series: 'business',
    name: t('Freight Solutions', 'حلول الشحن'),
    slides: [
      {
        type: 'cover',
        graphic: { theme: 'dark', icons: ['ship', 'plane', 'truck'] },
        title: t('Integrated freight, **by sea, air and land.**', 'حلول شحن متكاملة، **بحراً وجواً وبراً.**'),
        sub: t('The right mode for every shipment.', 'وسيلة الشحن المناسبة لكل شحنة.'),
      },
      {
        type: 'statement',
        theme: 'green',
        text: t(
          'Every shipment has its own balance of time, volume and cost. **The right mode makes the difference.**',
          'لكل شحنة توازنها الخاص بين الوقت والحجم والتكلفة، **واختيار الوسيلة المناسبة يصنع الفارق.**',
        ),
      },
      {
        type: 'detail',
        theme: 'white',
        icon: 'ship',
        eyebrow: t('Sea Freight', 'الشحن البحري'),
        title: t('FCL, LCL and **port-to-port shipping.**', 'حاويات كاملة وجزئية، **وشحن من ميناء إلى ميناء.**'),
        pills: [
          t('Full container load (FCL)', 'حاوية كاملة (FCL)'),
          t('Less than container load (LCL)', 'شحنة أقل من حاوية (LCL)'),
          t('Port-to-port', 'من ميناء إلى ميناء'),
        ],
      },
      {
        type: 'detail',
        theme: 'mist',
        icon: 'plane',
        eyebrow: t('Air Freight', 'الشحن الجوي'),
        title: t('Fast, **time-critical cargo by air.**', 'شحن جوي سريع **للبضائع الحساسة للوقت.**'),
        pills: [
          t('Import and export', 'استيراد وتصدير'),
          confirm('Priority handling', 'مناولة ذات أولوية'),
          confirm('Airport-to-airport or door-to-door', 'من مطار إلى مطار أو من الباب إلى الباب'),
        ],
      },
      {
        type: 'detail',
        theme: 'dark',
        icon: 'truck',
        eyebrow: t('Land Freight', 'الشحن البري'),
        title: t('Full truckload and **cross-border trucking.**', 'حمولات كاملة **ونقل بالشاحنات عبر الحدود.**'),
        pills: [
          t('Full truckload (FTL)', 'حمولة شاحنة كاملة (FTL)'),
          t('Cross-border trucking', 'نقل عبر الحدود'),
          confirm('UAE and GCC routes', 'مسارات داخل الإمارات ودول الخليج'),
        ],
      },
      {
        type: 'why',
        theme: 'green',
        items: [
          { icon: 'layers-2', text: t('One partner across every mode', 'شريك واحد لجميع وسائل الشحن') },
          { icon: 'radar', text: t('Full shipment visibility', 'رؤية كاملة لمسار الشحنة') },
          { icon: 'map-pin', text: confirm('Regional expertise across the GCC', 'خبرة إقليمية على مستوى دول الخليج') },
        ],
      },
      { type: 'cta', theme: 'dark', title: cta.complex, button: button.quote },
    ],
  },

  {
    id: 'customs-clearance',
    series: 'business',
    name: t('Customs Clearance', 'التخليص الجمركي'),
    slides: [
      {
        type: 'cover',
        graphic: { theme: 'green', icons: ['shield-check', 'file-text', 'stamp'] },
        title: t('Customs clearance, **handled with precision.**', 'تخليص جمركي **بدقة واحترافية.**'),
        sub: t('Brokerage and documentation.', 'الوساطة الجمركية وإعداد الوثائق.'),
      },
      {
        type: 'statement',
        theme: 'dark',
        text: t(
          'A single missing document can hold a shipment at customs **for days.**',
          'وثيقة واحدة ناقصة قد توقف الشحنة في الجمارك **لأيام.**',
        ),
      },
      {
        type: 'list',
        theme: 'white',
        title: t('Brokerage and documentation, **managed end to end.**', 'وساطة جمركية ووثائق **بإدارة متكاملة.**'),
        items: [
          { icon: 'stamp', text: t('Customs brokerage', 'الوساطة الجمركية') },
          { icon: 'file-text', text: t('Import and export documentation', 'وثائق الاستيراد والتصدير') },
          { icon: 'file-search', text: confirm('HS code classification', 'تصنيف رموز النظام المنسّق (HS)') },
          { icon: 'scale', text: confirm('Duty and tax guidance', 'إرشاد بشأن الرسوم والضرائب') },
        ],
      },
      {
        type: 'steps',
        theme: 'mist',
        title: t('Checked, filed, **released.**', 'مراجعة، فتقديم، **ثم إفراج.**'),
        steps: [
          { text: t('Documents reviewed before filing', 'مراجعة الوثائق قبل تقديمها') },
          { text: confirm('Customs declaration submitted', 'تقديم البيان الجمركي') },
          { text: t('Shipment released and on its way', 'الإفراج عن الشحنة ومواصلة رحلتها') },
        ],
      },
      {
        type: 'why',
        theme: 'green',
        items: [
          { icon: 'badge-check', text: confirm('Licensed customs brokers', 'مخلّصون جمركيون مرخّصون') },
          { icon: 'circle-check-big', text: t('Fewer holds, fewer surprises', 'تأخير أقل، ومفاجآت أقل') },
          { icon: 'headset', text: t('One point of contact', 'جهة تواصل واحدة') },
        ],
      },
      { type: 'cta', theme: 'dark', title: cta.complex, button: button.quote },
    ],
  },

  {
    id: 'warehousing',
    series: 'business',
    name: t('Warehousing', 'التخزين'),
    slides: [
      {
        type: 'cover',
        graphic: { theme: 'ink', icons: ['warehouse', 'boxes', 'forklift'] },
        title: t('Stored with care, **ready to move.**', 'تخزين بعناية، **وجاهزية للانطلاق.**'),
        sub: t('Storage, bonded and dangerous goods.', 'تخزين عام وجمركي وللبضائع الخطرة.'),
      },
      {
        type: 'statement',
        theme: 'green',
        text: t(
          'Inventory in the wrong place, or the wrong conditions, **costs time and money every day.**',
          'المخزون في المكان أو الظروف غير المناسبة **يكلّف وقتاً ومالاً كل يوم.**',
        ),
      },
      {
        type: 'list',
        theme: 'white',
        title: t('Storage built around **what you hold.**', 'تخزين مصمَّم **حسب طبيعة بضائعك.**'),
        items: [
          { icon: 'boxes', text: t('General storage', 'تخزين عام'), sub: t('For everyday inventory', 'للمخزون اليومي') },
          { icon: 'lock-keyhole', text: t('Bonded warehousing', 'مستودعات جمركية'), sub: t('Duty deferred until goods are released', 'تأجيل الرسوم حتى الإفراج عن البضائع') },
          { icon: 'triangle-alert', text: t('Dangerous goods (DG)', 'البضائع الخطرة'), sub: confirm('Specialised, compliant storage', 'تخزين متخصص وفق المتطلبات') },
        ],
      },
      {
        type: 'detail',
        theme: 'dark',
        icon: 'package',
        eyebrow: t('Fulfilment', 'تجهيز الطلبات'),
        title: t('From shelf to shipment, **without the wait.**', 'من الرف إلى الشحن، **دون انتظار.**'),
        pills: [
          confirm('Inventory visibility', 'رؤية واضحة للمخزون'),
          confirm('Pick, pack and dispatch', 'الانتقاء والتغليف والإرسال'),
          t('Linked to freight and last-mile', 'ربط مباشر بالشحن والتوصيل'),
        ],
      },
      {
        type: 'why',
        theme: 'green',
        items: [
          { icon: 'shield-check', text: confirm('Secure, monitored facilities', 'مرافق آمنة ومراقَبة') },
          { icon: 'badge-check', text: confirm('Compliant handling for regulated goods', 'مناولة متوافقة للبضائع الخاضعة للأنظمة') },
          { icon: 'route', text: t('One partner from storage to delivery', 'شريك واحد من التخزين حتى التسليم') },
        ],
      },
      { type: 'cta', theme: 'dark', title: cta.complex, button: button.quote },
    ],
  },

  {
    id: 'secure-government',
    series: 'secure',
    name: t('Secure & Government', 'الخدمات الآمنة والحكومية'),
    slides: [
      {
        type: 'cover',
        photo: { src: 'courier-handover.jpg', position: '50% 18%' },
        panel: 'ink',
        title: t('Secure handling for **documents that matter.**', 'تعامل آمن مع **الوثائق المهمة.**'),
        sub: t('Government, identity, legal and corporate documents.', 'وثائق حكومية وشخصية وقانونية ومؤسسية.'),
      },
      {
        type: 'statement',
        theme: 'dark',
        text: t(
          'Official and confidential documents demand verified handling, **a clear chain of custody and proof of delivery.**',
          'تتطلب الوثائق الرسمية والسرّية تعاملاً موثّقاً، **وتسلسلاً واضحاً للعهدة، وإثباتاً للتسليم.**',
        ),
      },
      {
        type: 'grid',
        theme: 'ink',
        eyebrow: t('Our services', 'خدماتنا'),
        title: t('Four dedicated **secure services.**', 'أربع خدمات **آمنة ومتخصصة.**'),
        items: [
          { icon: 'landmark', name: t('Gov & Institutional', 'الجهات الحكومية والمؤسسات'), text: t('Compliant document handling', 'التعامل مع الوثائق وفق المتطلبات التنظيمية') },
          { icon: 'id-card', name: t('Secure ID', 'الهوية الآمنة'), text: t('Emirates ID and passport delivery', 'توصيل بطاقات الهوية الإماراتية وجوازات السفر') },
          { icon: 'file-lock', name: t('Secure Docs', 'الوثائق الآمنة'), text: t('Courts, MOFA and customs', 'المحاكم ووزارة الخارجية والجمارك') },
          { icon: 'mail-check', name: t('Secure Mail', 'البريد الآمن'), text: t('Confidential corporate mail', 'بريد مؤسسي سرّي') },
        ],
      },
      {
        type: 'list',
        theme: 'white',
        eyebrow: t('Safeguards', 'الضمانات'),
        title: t('Safeguards **at every step.**', 'ضمانات **في كل خطوة.**'),
        items: [
          { icon: 'user-check', text: confirm('Identity verification at handover', 'التحقق من الهوية عند التسليم') },
          { icon: 'lock', text: confirm('Sealed, tamper-evident handling', 'مناولة مختومة تكشف أي عبث') },
          { icon: 'fingerprint', text: confirm('Recorded chain of custody', 'تسلسل موثّق للعهدة') },
          { icon: 'file-check', text: confirm('Proof of delivery', 'إثبات التسليم') },
        ],
      },
      {
        type: 'why',
        theme: 'green',
        items: [
          { icon: 'badge-check', text: confirm('Trained, vetted couriers', 'مندوبون مدرّبون وموثوقون') },
          { icon: 'shield-check', text: t('Processes built around compliance', 'إجراءات مبنية على الامتثال') },
          { icon: 'lock-keyhole', text: confirm('Delivered only to the authorised recipient', 'التسليم للمستلم المخوَّل فقط') },
        ],
      },
      { type: 'cta', theme: 'ink', title: cta.secure, button: button.team },
    ],
  },
];

module.exports = { series, ui, carousels };
