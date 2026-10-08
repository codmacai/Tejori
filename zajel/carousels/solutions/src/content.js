// "All solutions" carousel: one cover + one poster-style slide per solution, EN + AR.
// **text** marks the accent (italic green in English, green in Arabic).
// `confirm()` marks claims Zajel must confirm before publishing (⚑ in content.md, not rendered).

const t = (en, ar) => ({ en, ar });
const confirm = (en, ar) => ({ en, ar, confirm: true });

const ui = {
  label: t('Zajel solutions', 'حلول زاجل'),
  swipe: t('Swipe', 'اسحب'),
  contact: 'info@zajel.com',
};

const cover = {
  headline: t('Every solution. **One partner.**', 'كل الحلول. **شريك واحد.**'),
  body: t(
    'From urgent parcels to freight, customs, storage and secure documents: intelligent movement, end to end.',
    'من الطرود العاجلة إلى الشحن والتخليص الجمركي والتخزين والوثائق الآمنة: حركة ذكية من البداية إلى النهاية.',
  ),
  photos: ['courier-van.jpg', 'parcel-doorstep.jpg', 'app-tracking.jpg', 'courier-handover.jpg'],
};

// Each solution is a stop on one continuous route that runs across the whole carousel.
// `photo` or `art` (a large line icon) fills the wing-shaped frame; `chip` is the glass icon badge.
// theme: 'dark' (deep green) or 'green' (bright Zajel green); photo and art slides alternate.
const solutions = [
  {
    id: 'on-demand-express',
    theme: 'dark',
    chip: 'zap',
    photo: { src: 'courier-van.jpg', position: '62% 30%', positionAr: '62% 30%' },
    name: t('On Demand Express', 'التوصيل السريع عند الطلب'),
    headline: t('When every **minute** matters.', 'حين تكون كل **دقيقة** مهمة.'),
    body: t(
      'Instant solutions for urgent documents and parcels: collected fast, delivered direct and tracked live.',
      'حلول فورية للوثائق والطرود العاجلة: استلام سريع، وتوصيل مباشر، وتتبّع لحظي.',
    ),
    tags: [t('Rapid pickup', 'استلام سريع'), confirm('Direct delivery', 'توصيل مباشر'), t('Live tracking', 'تتبّع لحظي')],
  },
  {
    id: 'freight',
    theme: 'green',
    art: { icon: 'container' },
    name: t('Freight Solutions', 'حلول الشحن'),
    headline: t('Sea. Air. **Land.**', 'بحراً. جواً. **براً.**'),
    body: t(
      'FCL, LCL and port-to-port shipping, time-critical air cargo, and full truckload cross-border trucking.',
      'شحن بحري بحاويات كاملة وجزئية، وشحن جوي للبضائع العاجلة، ونقل بري بحمولات كاملة عبر الحدود.',
    ),
    tags: [t('Sea freight', 'شحن بحري'), t('Air freight', 'شحن جوي'), t('Land freight', 'شحن بري')],
  },
  {
    id: 'ecommerce',
    theme: 'dark',
    chip: 'shopping-bag',
    photo: { src: 'parcel-doorstep.jpg', position: '40% 40%', positionAr: '40% 40%' },
    name: t('Ecommerce', 'التجارة الإلكترونية'),
    headline: t('Every order, **every mile.**', 'كل طلب، في **كل ميل.**'),
    body: t(
      'First, mid and last-mile delivery for online businesses, with cash on delivery settled faster.',
      'توصيل الميل الأول والأوسط والأخير للأعمال الإلكترونية، مع تسوية أسرع لمبالغ الدفع عند الاستلام.',
    ),
    bodyConfirm: true,
    tags: [t('First mile', 'الميل الأول'), t('Mid mile', 'الميل الأوسط'), t('Last mile', 'الميل الأخير')],
  },
  {
    id: 'customs-clearance',
    theme: 'green',
    art: { icon: 'stamp' },
    name: t('Customs Clearance', 'التخليص الجمركي'),
    headline: t('Cleared with **precision.**', 'تخليص جمركي **بدقة.**'),
    body: t(
      'Brokerage and documentation, checked before filing so your shipment keeps moving.',
      'وساطة جمركية وإعداد للوثائق، بمراجعة دقيقة قبل التقديم لتبقى شحنتك في حركة.',
    ),
    tags: [t('Brokerage', 'الوساطة الجمركية'), t('Documentation', 'الوثائق'), t('Compliance', 'الامتثال')],
  },
  {
    id: 'international-shipping',
    theme: 'dark',
    chip: 'globe',
    photo: { src: 'app-tracking.jpg', position: '50% 28%', positionAr: '50% 28%' },
    name: t('International Shipping', 'الشحن الدولي'),
    headline: t('Global reach, **local expertise.**', 'انتشار عالمي، **بخبرة محلية.**'),
    body: t(
      'Documents and parcels delivered worldwide, with customs paperwork prepared and every step tracked.',
      'توصيل الوثائق والطرود إلى جميع أنحاء العالم، مع تجهيز الأوراق الجمركية وتتبّع كل خطوة.',
    ),
    tags: [confirm('Worldwide', 'تغطية عالمية'), confirm('Door to door', 'من الباب إلى الباب'), t('Tracked', 'تتبّع دولي')],
  },
  {
    id: 'warehousing',
    theme: 'green',
    art: { icon: 'warehouse' },
    name: t('Warehousing', 'التخزين'),
    headline: t('Stored safe. **Ready to move.**', 'تخزين آمن، **وجاهزية للانطلاق.**'),
    body: t(
      'General, bonded and dangerous goods storage, connected to our freight and delivery network.',
      'تخزين عام وجمركي وللبضائع الخطرة، مرتبط بشبكة الشحن والتوصيل لدينا.',
    ),
    tags: [t('General', 'تخزين عام'), t('Bonded', 'مستودعات جمركية'), t('Dangerous goods', 'بضائع خطرة')],
  },
  {
    id: 'secure-government',
    theme: 'dark',
    chip: 'shield-check',
    photo: { src: 'courier-handover.jpg', position: '50% 30%', positionAr: '50% 30%' },
    name: t('Secure & Government', 'الخدمات الآمنة والحكومية'),
    headline: t('Documents in **trusted hands.**', 'وثائقك في **أيدٍ أمينة.**'),
    body: t(
      'Government, Emirates ID, legal and confidential corporate documents, handled with verified care.',
      'الوثائق الحكومية، وبطاقات الهوية الإماراتية، والمستندات القانونية، والبريد المؤسسي السرّي، بتعامل موثّق.',
    ),
    tags: [t('Gov & Institutional', 'الجهات الحكومية'), t('Secure ID', 'الهوية الآمنة'), t('Secure Docs', 'الوثائق الآمنة'), t('Secure Mail', 'البريد الآمن')],
  },
];

module.exports = { ui, cover, solutions };
