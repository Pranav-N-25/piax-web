// Terms of Use and Privacy Policy text, written from what the PIAX website, API and app actually do today.
// `status: 'draft'` shows a notice on the page until PIAX's legal advisers have reviewed and approved the text.
// When it is approved: set status to 'approved' and update `updated`. Every paragraph is plain text.

const company = 'PIAX LIFE PRIVATE LIMITED'
const contact = 'support@piax.co.in'

export const legalPages = {
  terms: {
    path: '/terms',
    title: 'Terms of Use',
    lead: `These terms explain how you can use the PIAX website and app, and what you can expect from us. Please read them before you shop or create an account.`,
    updated: '1 October 2026',
    status: 'draft',
    sections: [
      {
        id: 'about', title: 'Who we are',
        body: [
          `The PIAX website (piax.co.in) and the PIAX app are run by ${company} (“PIAX”, “we”, “us”), a company registered in India.`,
          `By using the website or app, or by placing an order, you agree to these terms. If you do not agree, please do not use our services.`,
        ],
      },
      {
        id: 'account', title: 'Your account',
        body: [
          `You can create an account with your mobile number, your email and a password, or with Google, Facebook or Instagram where those options are shown.`,
          `Please give accurate details and keep your password and one-time codes private. You are responsible for activity on your account. Tell us straight away at ${contact} if you think someone else has used it.`,
          `If you are under 18, please use PIAX with the involvement of a parent or guardian.`,
        ],
      },
      {
        id: 'products', title: 'Products, prices and orders',
        body: [
          `We describe each PIAX product as accurately as we can, including its size and pack quantity. Product photos are representative; packaging may change over time.`,
          `Prices are in Indian rupees and include applicable taxes unless stated otherwise. We may change prices at any time, but an order you have already placed keeps the price shown at checkout.`,
          `An order is accepted when we confirm it. We may cancel an order, with a full refund of any amount paid, if a product is unavailable, a price was shown in error, or we suspect misuse.`,
          `Sanitary products cannot be returned once opened, for hygiene reasons. If something arrives damaged, incorrect or incomplete, contact us as soon as you can after delivery and we will put it right.`,
        ],
      },
      {
        id: 'delivery', title: 'Delivery',
        body: [
          `We deliver to the addresses and pincodes we can serve. Delivery times shown are estimates. Where an estimated arrival time is shown before payment (for example, emergency delivery from a partner store in the app), it depends on availability and conditions on the day.`,
          `Orders are packed in plain, discreet packaging.`,
        ],
      },
      {
        id: 'health', title: 'Health information and PIAX AI',
        body: [
          `Articles, cycle predictions, insights and PIAX AI replies are general information to help you understand your body. They are not medical advice, diagnosis or treatment, and cycle predictions are estimates, not a method of contraception or a conception aid.`,
          `Always speak to a qualified healthcare professional about symptoms or concerns. In an emergency, call 112.`,
          `PIAX AI replies are written by an AI system and can be wrong. Do not rely on them for decisions about your health.`,
        ],
      },
      {
        id: 'use', title: 'Using PIAX fairly',
        body: [
          `Please do not misuse our services: no attempts to break or overload them, access other people’s accounts or data, scrape content, or use PIAX for anything unlawful or harmful.`,
          `In community and chat features, be respectful. We may remove content or suspend accounts that break these terms.`,
        ],
      },
      {
        id: 'content', title: 'Our content',
        body: [
          `The PIAX name, logo, product designs, text, images and software belong to PIAX or our licensors. You may use them only to use our services for yourself, not to copy, sell or republish them.`,
        ],
      },
      {
        id: 'liability', title: 'Our responsibility to you',
        body: [
          `We work hard to keep PIAX accurate and available, but we cannot promise it will always be uninterrupted or error-free.`,
          `Nothing in these terms limits your rights under Indian consumer law. Apart from those rights, and to the extent the law allows, we are not responsible for indirect losses, and our total responsibility for any order is limited to the amount you paid for it.`,
        ],
      },
      {
        id: 'changes', title: 'Changes to these terms',
        body: [
          `We may update these terms as PIAX grows. We will show the date of the latest change at the top of this page, and tell you about important changes in the app or by email.`,
        ],
      },
      {
        id: 'law', title: 'Governing law and contact',
        body: [
          `These terms are governed by the laws of India.`,
          `Questions or complaints? Email ${contact}.`,
        ],
      },
    ],
  },

  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    lead: `Your privacy matters, especially for something as personal as your period. This policy explains what we collect, why, and the choices you have.`,
    updated: '1 October 2026',
    status: 'draft',
    sections: [
      {
        id: 'summary', title: 'In short',
        body: [
          `We collect only what we need to run PIAX: to sign you in, deliver your orders and, if you choose to use them, power cycle tracking and PIAX AI.`,
          `We do not sell your personal data. Businesses that sell PIAX never see your individual cycle or health information.`,
          `You can ask us to see, correct or delete your data at any time.`,
        ],
      },
      {
        id: 'collect', title: 'What we collect',
        body: [
          `Account details: your name, and your mobile number and/or email address. If you use a password, we store only a secure one-way hash of it, never the password itself.`,
          `Social sign-in: if you continue with Google, Facebook or Instagram, we receive your account ID with that service and, where they share it, your name and email address. We do not receive your password or post anything for you.`,
          `Orders: delivery addresses, order history and payment status. Card and UPI details are handled by our payment provider; we do not store them.`,
          `Cycle and wellness data (in the PIAX app): period dates, flow, symptoms, mood, notes and similar information you choose to log.`,
          `Messages: what you ask PIAX AI or support, and chats with friends (which are end-to-end encrypted, so we cannot read them).`,
          `Technical data: basic device and usage information needed to keep the service secure and working.`,
        ],
      },
      {
        id: 'use', title: 'How we use it',
        body: [
          `To create and secure your account, sign you in and send one-time codes.`,
          `To process, deliver and support your orders.`,
          `To show cycle predictions, reminders and insights you have asked for.`,
          `To answer your questions through PIAX AI and support.`,
          `To keep PIAX safe, prevent fraud and meet our legal obligations.`,
          `With your consent, to send you offers and updates. You can opt out at any time.`,
        ],
      },
      {
        id: 'health', title: 'Your cycle and health data',
        body: [
          `We treat cycle, symptom and other health-related data as especially sensitive. It is used only to provide the features you use, is never sold, and is never shared with advertisers or with businesses that sell PIAX.`,
          `When you use PIAX AI, only the information needed to answer your question is sent to our AI provider, and it is not used to advertise to you.`,
        ],
      },
      {
        id: 'cookies', title: 'Cookies',
        body: [
          `We use a small number of essential cookies: one keeps you signed in (it cannot be read by scripts on the page), and one briefly protects social sign-in from misuse. We also save your cart and favourites on your device.`,
          `We do not use advertising cookies on the website.`,
        ],
      },
      {
        id: 'sharing', title: 'Who we share it with',
        body: [
          `Service providers that help us run PIAX — such as hosting, payments, SMS for one-time codes, email, delivery partners and partner stores fulfilling your order — receive only what they need for that job, under contract.`,
          `Authorities, when the law requires it.`,
          `We never sell your personal data.`,
        ],
      },
      {
        id: 'security', title: 'How we protect it',
        body: [
          `Data is encrypted in transit. Passwords are hashed, one-time codes expire after 5 minutes and are limited to a few attempts, and access to personal data inside PIAX is restricted to people who need it.`,
          `No system is perfectly secure. If we ever have a breach that affects you, we will tell you and the authorities as the law requires.`,
        ],
      },
      {
        id: 'retention', title: 'How long we keep it',
        body: [
          `We keep your data while your account is open and for as long as needed for the purposes above, including legal, tax and accounting requirements. When you delete your account, we delete or anonymise your personal data unless the law requires us to keep it.`,
        ],
      },
      {
        id: 'rights', title: 'Your rights and choices',
        body: [
          `Under India’s Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your personal data, withdraw consent, and nominate someone to exercise these rights for you.`,
          `In the PIAX app you can copy everything the app keeps about you, or delete it all. For anything else, email ${contact}.`,
          `If you are not happy with our response, you may complain to the Data Protection Board of India.`,
        ],
      },
      {
        id: 'children', title: 'Children',
        body: [
          `Users under 18 should use PIAX with a parent or guardian. Where the law requires it, we ask for verifiable consent from a parent or guardian before processing a child’s data.`,
        ],
      },
      {
        id: 'contact', title: 'Changes and contact',
        body: [
          `We will update this policy as PIAX changes and show the date of the latest version at the top. Important changes will be announced in the app or by email.`,
          `Questions, requests or complaints about your privacy: ${contact}.`,
        ],
      },
    ],
  },
}
