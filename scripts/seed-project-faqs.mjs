// Seed AIO/GEO/AEO/SXO-optimised FAQs into projects.faq (Payload CMS).
// Idempotent: skips any project that already has FAQs so admin edits are never clobbered.
//
// Run: node --env-file=.env.local scripts/seed-project-faqs.mjs

import { getPayload } from 'payload'
import config from '../payload.config.js'

const FAQS = {
  // ============ ACTIVE (ON SALE) PROJECTS — 7 fact-based Q&As each ============

  vidhatri: [
    {
      question: 'Where is Vidhatri located in Madurai?',
      answer:
        'Vidhatri is a residential apartment project by Visvas in Ponmeni, Madurai, Tamil Nadu. Ponmeni is a well-connected neighbourhood in south-west Madurai with quick access to schools, hospitals, shopping, and arterial roads, making it a practical location for families buying a home in Madurai.',
    },
    {
      question: 'Is Vidhatri RERA approved?',
      answer:
        'Yes. Vidhatri is a RERA-registered project with registration number TN/20/Building/0061/2025, giving buyers the transparency and legal protections of the Tamil Nadu Real Estate Regulatory Authority. Registration details can be verified on the TN RERA portal.',
    },
    {
      question: 'What BHK configurations are available at Vidhatri?',
      answer:
        'Vidhatri offers 2 BHK and 3 BHK apartments in Ponmeni, Madurai. Both configurations are designed for family living, and the Visvas team can help you choose the layout that best fits your household size and budget.',
    },
    {
      question: 'What amenities does Vidhatri offer?',
      answer:
        'Vidhatri residents get a swimming pool, a 2,500 sq ft gym, a children’s play area, an event hall, dedicated parking, 24/7 surveillance, 24-hour backup electricity, and 24-hour water supply — everyday comfort and security within the community in Ponmeni, Madurai.',
    },
    {
      question: 'What is the current status of Vidhatri?',
      answer:
        'Vidhatri is currently on sale, with apartments open for booking enquiries. For the latest availability, floor options, and possession timelines, contact the Visvas sales team through the enquiry form on this page.',
    },
    {
      question: 'How can I book a site visit to Vidhatri?',
      answer:
        'You can book a site visit to Vidhatri by submitting the enquiry form on this page or calling the Visvas team. A site visit lets you walk through the project in Ponmeni, Madurai, see the apartment layouts, and evaluate the neighbourhood first-hand.',
    },
    {
      question: 'Why buy an apartment in Ponmeni, Madurai?',
      answer:
        'Ponmeni is an established residential area in south-west Madurai known for good road connectivity, reputed schools, healthcare, and daily conveniences. Buying an apartment in Ponmeni puts you close to the city’s growth corridor while retaining a settled neighbourhood feel.',
    },
  ],

  madhyapuri: [
    {
      question: 'Where is Madhyapuri located in Madurai?',
      answer:
        'Madhyapuri is a residential apartment project by Visvas in Ellis Nagar, Madurai, Tamil Nadu 625016. Ellis Nagar is a central, well-developed locality with schools, hospitals, markets, and quick access to key city roads, making it a sought-after address in Madurai.',
    },
    {
      question: 'Is Madhyapuri RERA approved?',
      answer:
        'Yes. Madhyapuri is a RERA-registered project with registration number TN/20/Building/0348/2024, so buyers get the transparency and legal protections of the Tamil Nadu Real Estate Regulatory Authority. Details can be verified on the TN RERA portal.',
    },
    {
      question: 'What BHK configurations are available at Madhyapuri?',
      answer:
        'Madhyapuri offers spacious 3 BHK apartments in Ellis Nagar, Madurai. The 3 BHK layout suits families who want extra room for children, parents, or a home office in a central Madurai location.',
    },
    {
      question: 'What amenities does Madhyapuri offer?',
      answer:
        'Madhyapuri residents enjoy an air-conditioned gym, landscaped lawn, walking track, yoga deck, children’s play area, 24/7 surveillance, and 24-hour backup electricity — a health-and-wellness focused amenity set within the community in Ellis Nagar, Madurai.',
    },
    {
      question: 'What is the current status of Madhyapuri?',
      answer:
        'Madhyapuri is currently on sale, with 3 BHK apartments open for booking enquiries. For live availability, floor preferences, and possession timelines, contact the Visvas sales team through the enquiry form on this page.',
    },
    {
      question: 'How can I book a site visit to Madhyapuri?',
      answer:
        'Submit the enquiry form on this page or call the Visvas team to schedule a site visit to Madhyapuri. Visiting the project in Ellis Nagar lets you experience the apartment layouts, build quality, and neighbourhood before you decide.',
    },
    {
      question: 'Why buy an apartment in Ellis Nagar, Madurai?',
      answer:
        'Ellis Nagar is one of Madurai’s established central neighbourhoods, prized for its connectivity, schools, hospitals, and everyday conveniences. An apartment in Ellis Nagar keeps you minutes from the city core while living in a mature, well-serviced residential area.',
    },
  ],

  aparna: [
    {
      question: 'Where is Aparna (2 BHK) located in Madurai?',
      answer:
        'Aparna (2 BHK) is a residential apartment project by Visvas inside Viprosaa Enclave on Melakkal Main Road, Thuvariman, Madurai, Tamil Nadu 625019. Thuvariman is a fast-growing residential corridor in west Madurai with easy access to the city and the ring road.',
    },
    {
      question: 'Is Aparna RERA approved?',
      answer:
        'Yes. Aparna is a RERA-registered project with registration number TN/20/Building/414/2023, giving buyers the transparency and legal protections of the Tamil Nadu Real Estate Regulatory Authority. Registration details can be verified on the TN RERA portal.',
    },
    {
      question: 'What configurations are available at Aparna (2 BHK)?',
      answer:
        'Aparna offers 2 BHK apartments along with compact studio units in Thuvariman, Madurai. The 2 BHK plan suits small families and first-time buyers, while studios work well for singles, professionals, and investors.',
    },
    {
      question: 'What amenities does Aparna offer?',
      answer:
        'Aparna residents get a gym, indoor badminton court, table tennis, open-air theatre, yoga deck, children’s play area, dedicated parking, 24/7 surveillance, 24-hour backup electricity, and 24-hour water supply — an active-lifestyle amenity set within Viprosaa Enclave, Thuvariman.',
    },
    {
      question: 'What is the current status of Aparna (2 BHK)?',
      answer:
        'Aparna (2 BHK) is currently on sale, with apartments open for booking enquiries. For the latest availability, floor options, and possession timelines, contact the Visvas sales team through the enquiry form on this page.',
    },
    {
      question: 'How can I book a site visit to Aparna?',
      answer:
        'Book a site visit to Aparna by submitting the enquiry form on this page or calling the Visvas team. A visit to Viprosaa Enclave in Thuvariman lets you compare the studio and 2 BHK layouts and evaluate the community first-hand.',
    },
    {
      question: 'Why buy an apartment in Thuvariman, Madurai?',
      answer:
        'Thuvariman, on Melakkal Main Road in west Madurai, is one of the city’s fastest-growing residential corridors — close to the ring road, educational institutions, and upcoming infrastructure. Buying early in Thuvariman combines liveability today with long-term appreciation potential.',
    },
  ],

  'aparna-1bhk': [
    {
      question: 'Where is Aparna (1 BHK) located in Madurai?',
      answer:
        'Aparna (1 BHK) is a residential apartment project by Visvas inside Viprosaa Enclave on Melakkal Main Road, Thuvariman, Madurai, Tamil Nadu 625019. Thuvariman is a fast-growing corridor in west Madurai with easy access to the city and ring road.',
    },
    {
      question: 'Is Aparna (1 BHK) RERA approved?',
      answer:
        'Yes. Aparna is a RERA-registered project with registration number TN/20/Building/414/2023, so buyers get the transparency and legal protections of the Tamil Nadu Real Estate Regulatory Authority. Details can be verified on the TN RERA portal.',
    },
    {
      question: 'What configurations are available at Aparna (1 BHK)?',
      answer:
        'Aparna (1 BHK) offers compact 1 BHK apartments of around 629 sq ft along with studio units in Thuvariman, Madurai — right-sized homes for singles, young couples, senior citizens, and investors looking for an affordable entry into Madurai real estate.',
    },
    {
      question: 'What amenities does Aparna (1 BHK) offer?',
      answer:
        'Residents of Aparna (1 BHK) enjoy an indoor badminton court, table tennis, open-air theatre, yoga deck, children’s play area, 24/7 surveillance, and 24-hour backup electricity within Viprosaa Enclave, Thuvariman — community amenities usually found in much larger-format projects.',
    },
    {
      question: 'What is the current status of Aparna (1 BHK)?',
      answer:
        'Aparna (1 BHK) is currently on sale, with apartments open for booking enquiries. For live availability and possession timelines, contact the Visvas sales team through the enquiry form on this page.',
    },
    {
      question: 'How can I book a site visit to Aparna (1 BHK)?',
      answer:
        'Submit the enquiry form on this page or call the Visvas team to schedule a site visit. Visiting Viprosaa Enclave in Thuvariman lets you walk through the 1 BHK and studio layouts and judge the community and neighbourhood yourself.',
    },
    {
      question: 'Is a 1 BHK in Thuvariman a good investment?',
      answer:
        'A 1 BHK in Thuvariman offers one of the most affordable entry points into west Madurai’s growth corridor. With the locality’s expanding infrastructure and rental demand from students and professionals, compact homes here suit both first-time owners and rental-yield investors.',
    },
  ],

  'visvas-ajita-phase-i-extension-b-block': [
    {
      question: 'Where is Ajita Phase I Extension (B Block) located in Madurai?',
      answer:
        'Ajita – Phase I Extension (B Block) is a villa project by Visvas inside Viprosaa Enclave, Aprameya Sector, Melakkal, Thuvariman, Madurai, Tamil Nadu 625019. Thuvariman is a fast-developing residential corridor in west Madurai with strong road connectivity.',
    },
    {
      question: 'What villa configurations are available at Ajita Phase I Extension?',
      answer:
        'Ajita – Phase I Extension (B Block) offers independent 3 BHK and 4 BHK villas in Thuvariman, Madurai. The layouts are designed for families who want private, spacious living with the security and amenities of a gated community.',
    },
    {
      question: 'What amenities does Ajita Phase I Extension offer?',
      answer:
        'Villa owners at Ajita enjoy a clubhouse, swimming pool, gym, landscaped lawn, children’s play area, table tennis, yoga deck, WiFi-enabled common areas, dedicated parking, 24/7 surveillance, 24-hour backup electricity, and 24-hour water supply within Viprosaa Enclave, Thuvariman.',
    },
    {
      question: 'What is the current status of Ajita Phase I Extension (B Block)?',
      answer:
        'Ajita – Phase I Extension (B Block) is currently on sale, with villas open for booking enquiries. For live availability and possession timelines, contact the Visvas sales team through the enquiry form on this page.',
    },
    {
      question: 'How can I book a site visit to Ajita Phase I Extension?',
      answer:
        'Book a site visit by submitting the enquiry form on this page or calling the Visvas team. Walking through the villas at Viprosaa Enclave in Thuvariman is the best way to experience the build quality, layouts, and community.',
    },
    {
      question: 'Why buy a villa in Thuvariman, Madurai?',
      answer:
        'Thuvariman in west Madurai combines space and value: land-backed villa living minutes from the ring road, schools, and the city’s expanding infrastructure. Villas in gated communities here offer privacy and long-term appreciation that city-centre apartments rarely match.',
    },
    {
      question: 'Are Visvas villas part of a gated community?',
      answer:
        'Yes. Ajita villas sit inside Viprosaa Enclave, a Visvas gated community in Thuvariman, Madurai, with 24/7 surveillance, common amenities like the clubhouse and swimming pool, and a managed neighbourhood of like-minded homeowners.',
    },
  ],

  'visvas-amita': [
    {
      question: 'Where is Amita located in Madurai?',
      answer:
        'Amita is a villa project by Visvas inside Viprosaa Enclave on Melakkal Main Road, Thuvariman, Madurai, Tamil Nadu 625019. Thuvariman is a fast-growing residential corridor in west Madurai, well connected to the ring road and the city.',
    },
    {
      question: 'What villa configurations are available at Amita?',
      answer:
        'Amita offers independent 3 BHK villas in Thuvariman, Madurai — spacious, private homes designed for families who want villa living with the security and shared amenities of a gated community.',
    },
    {
      question: 'What amenities does Amita offer?',
      answer:
        'Amita villa owners enjoy a clubhouse, swimming pool, gym, open-air theatre, walking track, yoga deck, children’s play area, air-conditioned common spaces, WiFi-enabled areas, dedicated parking, 24/7 surveillance, 24-hour backup electricity, and 24-hour water supply within Viprosaa Enclave.',
    },
    {
      question: 'What is the current status of Amita?',
      answer:
        'Amita is currently on sale, with 3 BHK villas open for booking enquiries. For live availability and possession timelines, contact the Visvas sales team through the enquiry form on this page.',
    },
    {
      question: 'How can I book a site visit to Amita?',
      answer:
        'Submit the enquiry form on this page or call the Visvas team to schedule a site visit to Amita. Visiting Viprosaa Enclave in Thuvariman lets you walk through the villas and experience the community before deciding.',
    },
    {
      question: 'Why buy a villa in Thuvariman, Madurai?',
      answer:
        'Thuvariman in west Madurai offers land-backed villa living minutes from the ring road, schools, and expanding city infrastructure. Gated-community villas here combine privacy, space, and appreciation potential that is hard to find closer to the city centre.',
    },
    {
      question: 'Are Amita villas part of a gated community?',
      answer:
        'Yes. Amita villas are part of Viprosaa Enclave, a Visvas gated community in Thuvariman, Madurai, with round-the-clock security, a clubhouse, swimming pool, and shared amenities maintained for all resident families.',
    },
  ],

  // ============ COMPLETED PROJECTS — 4 evergreen Q&As each ============

  supraja: [
    {
      question: 'What is Supraja by Visvas?',
      answer:
        'Supraja is a completed villa project by Visvas in Madurai, Tamil Nadu, offering 1 BHK and 1.5 BHK villa homes. It is part of Visvas’s delivered portfolio of residential communities in Madurai.',
    },
    {
      question: 'What configurations did Supraja offer?',
      answer:
        'Supraja offered compact 1 BHK and 1.5 BHK villas — right-sized independent homes suited to small families, senior citizens, and buyers seeking low-maintenance villa living in Madurai.',
    },
    {
      question: 'Is Supraja still available for purchase?',
      answer:
        'Supraja is a completed and fully delivered project, so new units are no longer sold by the builder. You can contact the Visvas team about resale availability in Supraja or explore Visvas’s ongoing projects in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Supraja?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Supraja — whether for resale interest, documentation, or to discover current Visvas projects on sale in Madurai.',
    },
  ],

  'ajita-phase-ii-visvas-ajita': [
    {
      question: 'What is Ajita Phase II by Visvas?',
      answer:
        'Ajita Phase II is a completed villa project by Visvas in Madurai, Tamil Nadu, offering spacious 4 BHK villas. It is part of the Visvas Ajita villa community, a delivered gated development in west Madurai.',
    },
    {
      question: 'What configurations did Ajita Phase II offer?',
      answer:
        'Ajita Phase II offered independent 4 BHK villas — large family homes with private space and the shared security of the Visvas Ajita community in Madurai.',
    },
    {
      question: 'Is Ajita Phase II still available for purchase?',
      answer:
        'Ajita Phase II is completed and fully delivered, so new villas are no longer sold by the builder. Contact the Visvas team about resale availability, or see Ajita – Phase I Extension (B Block), which is currently on sale in Thuvariman.',
    },
    {
      question: 'How can I contact Visvas about Ajita Phase II?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Ajita Phase II — for resale interest, documentation, or details of current Visvas villa projects in Madurai.',
    },
  ],

  'ajita-3-bhk-visvas-ajita': [
    {
      question: 'What is Ajita 3 BHK by Visvas?',
      answer:
        'Ajita 3 BHK is a completed villa project by Visvas in Madurai, Tamil Nadu, offering independent 3 BHK villas within the Visvas Ajita community — a delivered gated villa development in west Madurai.',
    },
    {
      question: 'What configurations did Ajita 3 BHK offer?',
      answer:
        'The project offered independent 3 BHK villas designed for family living — private homes with the security and neighbourhood feel of the Visvas Ajita gated community in Madurai.',
    },
    {
      question: 'Is Ajita 3 BHK still available for purchase?',
      answer:
        'Ajita 3 BHK is completed and fully delivered, so new villas are no longer sold by the builder. Contact the Visvas team about resale availability, or see Ajita – Phase I Extension (B Block), currently on sale in Thuvariman.',
    },
    {
      question: 'How can I contact Visvas about Ajita 3 BHK?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team — for resale interest, documentation, or details of Visvas villa projects currently on sale in Madurai.',
    },
  ],

  'ajita-4-bhk-visvas-ajita': [
    {
      question: 'What is Ajita 4 BHK by Visvas?',
      answer:
        'Ajita 4 BHK is a completed villa project by Visvas in Madurai, Tamil Nadu, offering independent 4 BHK villas within the Visvas Ajita community — a delivered gated villa development in west Madurai.',
    },
    {
      question: 'What configurations did Ajita 4 BHK offer?',
      answer:
        'The project offered spacious independent 4 BHK villas — large family homes combining private living space with the shared security of the Visvas Ajita gated community in Madurai.',
    },
    {
      question: 'Is Ajita 4 BHK still available for purchase?',
      answer:
        'Ajita 4 BHK is completed and fully delivered, so new villas are no longer sold by the builder. Contact the Visvas team about resale availability, or see Ajita – Phase I Extension (B Block), currently on sale in Thuvariman.',
    },
    {
      question: 'How can I contact Visvas about Ajita 4 BHK?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team — for resale interest, documentation, or details of Visvas villa projects currently on sale in Madurai.',
    },
  ],

  'aprameya-visvas-aprameya': [
    {
      question: 'What is Aprameya by Visvas?',
      answer:
        'Aprameya is a completed villa project by Visvas in Madurai, Tamil Nadu, offering 2 BHK villas. The Aprameya name also lives on in the Aprameya Sector of Viprosaa Enclave, Visvas’s community in Thuvariman.',
    },
    {
      question: 'What configurations did Aprameya offer?',
      answer:
        'Aprameya offered independent 2 BHK villas — compact, low-maintenance villa homes suited to small families and first-time villa buyers in Madurai.',
    },
    {
      question: 'Is Aprameya still available for purchase?',
      answer:
        'Aprameya is completed and fully delivered, so new villas are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s villa projects currently on sale in Thuvariman, Madurai.',
    },
    {
      question: 'How can I contact Visvas about Aprameya?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Aprameya — for resale interest, documentation, or current Visvas projects in Madurai.',
    },
  ],

  'vaaruni-enclave': [
    {
      question: 'What is Vaaruni Enclave by Visvas?',
      answer:
        'Vaaruni Enclave is a completed plotted development by Visvas in Madurai, Tamil Nadu — residential plots in a planned layout where buyers could build homes to their own design within an organised community.',
    },
    {
      question: 'What did Vaaruni Enclave offer?',
      answer:
        'Vaaruni Enclave offered residential plots in a planned, developed layout in Madurai — with organised roads and infrastructure, giving buyers land ownership plus the freedom to build their own home.',
    },
    {
      question: 'Are plots in Vaaruni Enclave still available?',
      answer:
        'Vaaruni Enclave is completed and fully delivered, so new plots are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s current residential projects in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Vaaruni Enclave?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Vaaruni Enclave — for resale interest, documentation, or details of current Visvas projects in Madurai.',
    },
  ],

  agrini: [
    {
      question: 'What is Agrini by Visvas?',
      answer:
        'Agrini is a completed residential project by Visvas in Madurai, Tamil Nadu, combining apartments and residential villas in one delivered community — part of Visvas’s established portfolio of Madurai housing.',
    },
    {
      question: 'What homes did Agrini offer?',
      answer:
        'Agrini offered a mix of apartments and residential villas, letting buyers choose between low-maintenance apartment living and independent villa homes within the same Visvas community in Madurai.',
    },
    {
      question: 'Is Agrini still available for purchase?',
      answer:
        'Agrini is completed and fully delivered, so new homes are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s projects currently on sale in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Agrini?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Agrini — for resale interest, documentation, or current Visvas projects in Madurai.',
    },
  ],

  'vajra-visvas-vajra': [
    {
      question: 'What is Vajra by Visvas?',
      answer:
        'Vajra (Visvas Vajra) is a completed apartment project by Visvas in Madurai, Tamil Nadu — a delivered residential community that is part of Visvas’s track record of completed housing in the city.',
    },
    {
      question: 'What homes did Vajra offer?',
      answer:
        'Vajra offered residential apartments designed for comfortable family living in Madurai, built and delivered by Visvas as part of its completed apartment portfolio.',
    },
    {
      question: 'Is Vajra still available for purchase?',
      answer:
        'Vajra is completed and fully delivered, so new apartments are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s current projects on sale in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Vajra?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Vajra — for resale interest, documentation, or details of current Visvas projects in Madurai.',
    },
  ],

  'vasudhara-visvas-vasudhara': [
    {
      question: 'What is Vasudhara by Visvas?',
      answer:
        'Vasudhara (Visvas Vasudhara) is a completed residential project by Visvas in Madurai, Tamil Nadu, combining apartments and residential villas in one delivered community.',
    },
    {
      question: 'What homes did Vasudhara offer?',
      answer:
        'Vasudhara offered a mix of apartments and residential villas, giving buyers a choice between apartment convenience and independent villa living within the same Visvas community in Madurai.',
    },
    {
      question: 'Is Vasudhara still available for purchase?',
      answer:
        'Vasudhara is completed and fully delivered, so new homes are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s projects currently on sale in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Vasudhara?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Vasudhara — for resale interest, documentation, or current Visvas projects in Madurai.',
    },
  ],

  'vibhava-visvas-vibhava': [
    {
      question: 'What is Vibhava by Visvas?',
      answer:
        'Vibhava (Visvas Vibhava) is a completed residential project by Visvas in Madurai, Tamil Nadu, offering 3 BHK homes across apartments and residential villas in one delivered community.',
    },
    {
      question: 'What configurations did Vibhava offer?',
      answer:
        'Vibhava offered 3 BHK homes — available as apartments and residential villas — designed for families wanting spacious living within a Visvas community in Madurai.',
    },
    {
      question: 'Is Vibhava still available for purchase?',
      answer:
        'Vibhava is completed and fully delivered, so new homes are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s projects currently on sale in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Vibhava?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Vibhava — for resale interest, documentation, or current Visvas projects in Madurai.',
    },
  ],

  'virat-d-block-visvas-virat': [
    {
      question: 'What is Virat D Block by Visvas?',
      answer:
        'Virat D Block (Visvas Virat) is a completed apartment project by Visvas in Madurai, Tamil Nadu, offering 3 BHK apartments within the delivered Visvas Virat community.',
    },
    {
      question: 'What configurations did Virat D Block offer?',
      answer:
        'Virat D Block offered 3 BHK apartments — spacious family homes within the Visvas Virat community in Madurai, built and delivered by Visvas.',
    },
    {
      question: 'Is Virat D Block still available for purchase?',
      answer:
        'Virat D Block is completed and fully delivered, so new apartments are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s projects currently on sale in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Virat D Block?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Virat D Block — for resale interest, documentation, or current Visvas projects in Madurai.',
    },
  ],

  'virat-c-block-visvas-virat': [
    {
      question: 'What is Virat C Block by Visvas?',
      answer:
        'Virat C Block (Visvas Virat) is a completed apartment project by Visvas in Madurai, Tamil Nadu, offering 2 BHK apartments within the delivered Visvas Virat community.',
    },
    {
      question: 'What configurations did Virat C Block offer?',
      answer:
        'Virat C Block offered 2 BHK apartments — practical family homes within the Visvas Virat community in Madurai, built and delivered by Visvas.',
    },
    {
      question: 'Is Virat C Block still available for purchase?',
      answer:
        'Virat C Block is completed and fully delivered, so new apartments are no longer sold by the builder. Contact the Visvas team about resale availability or explore Visvas’s projects currently on sale in Madurai.',
    },
    {
      question: 'How can I contact Visvas about Virat C Block?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team about Virat C Block — for resale interest, documentation, or current Visvas projects in Madurai.',
    },
  ],

  'aparna-2': [
    {
      question: 'What is Aparna (Studio) by Visvas?',
      answer:
        'Aparna is a completed studio project by Visvas in Madurai, Tamil Nadu, offering compact 1 BHK studio homes — part of Visvas’s delivered portfolio of right-sized housing in the city.',
    },
    {
      question: 'What configurations did this Aparna project offer?',
      answer:
        'This Aparna project offered compact 1 BHK studio homes — efficient layouts suited to singles, young couples, senior citizens, and rental investors in Madurai.',
    },
    {
      question: 'Is this Aparna project still available for purchase?',
      answer:
        'This Aparna project is completed and fully delivered, so new units are no longer sold by the builder. Contact the Visvas team about resale availability, or see the Aparna 1 BHK and 2 BHK projects currently on sale in Thuvariman.',
    },
    {
      question: 'How can I contact Visvas about this project?',
      answer:
        'Use the enquiry form on this page or the contact details in the site footer to reach the Visvas team — for resale interest, documentation, or details of Aparna units currently on sale in Thuvariman, Madurai.',
    },
  ],
}

async function run() {
  const payload = await getPayload({ config })

  let updated = 0
  let skipped = 0
  let missing = 0

  for (const [slug, faq] of Object.entries(FAQS)) {
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })

    const project = result.docs[0]
    if (!project) {
      console.warn(`[FAQ SEED] MISSING project: ${slug}`)
      missing++
      continue
    }

    if (Array.isArray(project.faq) && project.faq.length > 0) {
      console.log(`[FAQ SEED] skip ${slug} — already has ${project.faq.length} FAQs`)
      skipped++
      continue
    }

    await payload.update({
      collection: 'projects',
      id: project.id,
      data: { faq },
    })
    console.log(`[FAQ SEED] updated ${slug} — ${faq.length} FAQs`)
    updated++
  }

  console.log(`[FAQ SEED] done: ${updated} updated, ${skipped} skipped, ${missing} missing`)
  process.exit(0)
}

run().catch((err) => {
  console.error('[FAQ SEED] failed:', err)
  process.exit(1)
})
