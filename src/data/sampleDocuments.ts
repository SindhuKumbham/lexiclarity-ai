import { LegalDocument, ClauseDiff } from '../types/legal';

export const SAMPLE_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-lease-standard',
    title: 'Standard Residential Apartment Lease (2025)',
    documentType: 'Lease Agreement',
    partyA: 'Apex Metropolitan Realty LLC (Landlord)',
    partyB: 'Jane Doe (Tenant)',
    jurisdiction: 'State of New York / Standard US Urban',
    wordCount: 3840,
    fleschKincaidGrade: 17.8, // Post-graduate level
    legaleseDensityPercent: 48,
    overallRiskScore: 78,
    executiveSummary: 'This 12-month residential apartment lease contains several aggressive landlord-favored provisions including an automatic 12-month renewal trap with a strict 60-day notice requirement, a 200% daily holdover penalty, a complete waiver of landlord liability for mold or water damage, and a broad indemnification clause requiring the tenant to pay all landlord attorney fees regardless of dispute outcome.',
    fullText: `RESIDENTIAL APARTMENT LEASE AGREEMENT

THIS LEASE AGREEMENT (the "Agreement") is entered into as of January 15, 2025, by and between APEX METROPOLITAN REALTY LLC, a Delaware limited liability company ("Landlord"), and JANE DOE, an individual ("Tenant").

SECTION 1. DEMISED PREMISES AND TERM
Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, Unit 4B located at 742 Evergreen Terrace (the "Premises"). The term shall commence on February 1, 2025 (the "Commencement Date") and expire on January 31, 2026 (the "Expiration Date").

SECTION 2. RENT AND LATE CHARGES
Tenant agrees to pay monthly base rent of $2,450.00 in advance on or before the first (1st) day of each calendar month. In the event rent is received after the fifth (5th) day of the month, Tenant shall pay a late fee equal to 10% of the overdue balance or $200.00, whichever is greater, plus interest accruing at 1.5% per month until settled.

SECTION 3. AUTOMATIC RENEWAL AND NOTICE OF INTENT
Unless Tenant delivers written notice of intention to vacate via certified registered mail to Landlord not less than sixty (60) days prior to the Expiration Date, this Agreement shall automatically renew for an additional twelve (12) month term at a monthly rent adjusted to current market rates plus a minimum mandatory fifteen percent (15%) escalation. Verbal notice or electronic mail transmission shall be deemed strictly null and void.

SECTION 4. HOLDOVER LIQUIDATED DAMAGES
If Tenant remains in possession of the Premises following the Expiration Date without express written consent from Landlord, Tenant shall pay holdover damages calculated at two hundred percent (200%) of the per diem rent in effect immediately prior to expiration, and shall defend, indemnify, and hold harmless Landlord against any third-party claims or damages resulting from delayed occupancy by subsequent tenants.

SECTION 5. LANDLORD ACCESS AND ENTRY
Landlord and Landlord's designated agents, contractors, and prospective purchasers or tenants shall retain the absolute and unconditioned right to enter the Premises at any hour between 7:00 AM and 10:00 PM without prior notice for purposes of inspection, maintenance, repairs, or showings. Tenant hereby irrevocably waives any claim for trespass, quiet enjoyment disruption, or constructive eviction arising out of such entries.

SECTION 6. INDEMNIFICATION AND WAIVER OF SUBROGATION
Tenant covenants and agrees to indemnify, defend, and hold harmless Landlord, its affiliates, directors, agents, and employees from and against any and all claims, liabilities, losses, damages, costs, and expenses (including attorneys' fees and expert witness disbursements) arising out of or related to Tenant's use, occupancy, or condition of the Premises, even if caused in whole or in part by the active or passive negligence of Landlord.

SECTION 7. REPAIR AND MAINTENANCE OBLIGATIONS
Tenant shall, at Tenant's sole expense, maintain the interior of the Premises in pristine condition, including prompt repair of all plumbing fixtures, electrical outlets, appliances, and air conditioning units. Landlord disclaims all express or implied warranties of habitability to the fullest extent permitted by law.

SECTION 8. DISPUTE RESOLUTION AND JURY TRIAL WAIVER
Any controversy, claim, or dispute arising out of or relating to this Lease shall be resolved exclusively through confidential binding arbitration administered by the American Arbitration Association. Tenant knowingly, voluntarily, and irrevocably waives any right to a trial by jury and any right to participate in any class, collective, or representative action against Landlord.`,
    clauses: [
      {
        id: 'cl-lease-1',
        clauseNumber: 'Section 3',
        sectionTitle: 'Automatic Renewal and Notice Trap',
        originalText: 'Unless Tenant delivers written notice of intention to vacate via certified registered mail to Landlord not less than sixty (60) days prior to the Expiration Date, this Agreement shall automatically renew for an additional twelve (12) month term at a monthly rent adjusted to current market rates plus a minimum mandatory fifteen percent (15%) escalation. Verbal notice or electronic mail transmission shall be deemed strictly null and void.',
        plainEnglishText: 'If you want to move out when your lease ends, you must send a certified physical letter at least 60 days before the deadline. Emails or phone calls do not count. If you forget or miss this deadline by even one day, you are automatically locked into another whole year, and your rent will jump by at least 15%.',
        keyObligation: 'Must send certified registered postal mail on or before December 2, 2025 to avoid auto-locking into another full year.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Certified Registered Mail',
            definition: 'A postal service trackable mailing option providing proof of mailing and delivery.',
            plainMeaning: 'A physical trip to the post office requiring a receipt and signature—standard email is disqualified.'
          },
          {
            term: 'Escalation',
            definition: 'A contractual provision providing for an automatic increase in payments.',
            plainMeaning: 'An automatic 15%+ price hike added to your rent.'
          }
        ],
        practicalAdvice: 'Set three calendar alerts: 90 days, 75 days, and 65 days before lease end. If you want to move out, send the certified letter early and demand a written stamped confirmation receipt.',
        favorsParty: 'heavily_one_sided'
      },
      {
        id: 'cl-lease-2',
        clauseNumber: 'Section 4',
        sectionTitle: 'Holdover Liquidated Damages',
        originalText: 'If Tenant remains in possession of the Premises following the Expiration Date without express written consent from Landlord, Tenant shall pay holdover damages calculated at two hundred percent (200%) of the per diem rent in effect immediately prior to expiration, and shall defend, indemnify, and hold harmless Landlord against any third-party claims or damages resulting from delayed occupancy by subsequent tenants.',
        plainEnglishText: 'If you stay even one day after your move-out date without written permission, you will be billed double the daily rent ($163/day). Worse, if a new tenant is waiting to move in and sues the landlord because you were late, you have to pay the landlord’s legal fees and any damages.',
        keyObligation: 'Move out completely by noon on the exact expiration date, or face double rent and uncapped third-party damages.',
        riskLevel: 'high',
        jargonTerms: [
          {
            term: 'Holdover',
            definition: 'Remaining on leased property after the expiration of the lease term without consent.',
            plainMeaning: 'Staying past your move-out date.'
          },
          {
            term: 'Per Diem',
            definition: 'Per day rate calculated by dividing monthly rent by days in month.',
            plainMeaning: 'Daily billing rate.'
          }
        ],
        practicalAdvice: 'Schedule movers at least 3 days before the official lease end date to prevent any risk of moving delays triggering holdover damages.',
        favorsParty: 'counterparty'
      },
      {
        id: 'cl-lease-3',
        clauseNumber: 'Section 5',
        sectionTitle: 'Landlord Entry Without Prior Notice',
        originalText: 'Landlord and Landlord\'s designated agents, contractors, and prospective purchasers or tenants shall retain the absolute and unconditioned right to enter the Premises at any hour between 7:00 AM and 10:00 PM without prior notice for purposes of inspection, maintenance, repairs, or showings. Tenant hereby irrevocably waives any claim for trespass, quiet enjoyment disruption, or constructive eviction arising out of such entries.',
        plainEnglishText: 'The landlord or their staff can unlock your apartment door anytime between 7 AM and 10 PM without warning you in advance. You give up your right to privacy and can’t complain about disturbance.',
        keyObligation: 'Allow unexpected entry without prior notification.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Constructive Eviction',
            definition: 'Circumstances caused by the landlord that render the property uninhabitable or unusable, forcing the tenant to vacate.',
            plainMeaning: 'The legal argument that your landlord made living there impossible so you had to leave.'
          },
          {
            term: 'Quiet Enjoyment',
            definition: 'The fundamental right of a tenant to inhabit rented property peacefully without interference.',
            plainMeaning: 'Your legal right to peaceful privacy inside your own home.'
          }
        ],
        practicalAdvice: 'In many jurisdictions (like NY and CA), entering without 24-hour advance notice is illegal under statutory law regardless of what the contract says. Ask to replace this with standard "24 hours written notice except in true emergencies".',
        favorsParty: 'heavily_one_sided'
      },
      {
        id: 'cl-lease-4',
        clauseNumber: 'Section 6',
        sectionTitle: 'Unilateral Indemnification & Negligence Shift',
        originalText: 'Tenant covenants and agrees to indemnify, defend, and hold harmless Landlord, its affiliates, directors, agents, and employees from and against any and all claims, liabilities, losses, damages, costs, and expenses (including attorneys\' fees and expert witness disbursements) arising out of or related to Tenant\'s use, occupancy, or condition of the Premises, even if caused in whole or in part by the active or passive negligence of Landlord.',
        plainEnglishText: 'You agree to protect the landlord and pay for their lawyers if an injury or accident happens in the building—even if the accident was caused by the landlord’s own carelessness or negligence!',
        keyObligation: 'Pay landlord legal expenses and damages even if landlord was at fault.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Indemnify and Hold Harmless',
            definition: 'An agreement where one party promises to pay for legal defense and financial damages incurred by the other party.',
            plainMeaning: 'You pay someone else’s legal bills and court penalties.'
          },
          {
            term: 'Active or Passive Negligence',
            definition: 'Carelessness either by doing a careless act or failing to act when there was a duty to prevent harm.',
            plainMeaning: 'Fault caused by laziness, disregard, or broken building conditions.'
          }
        ],
        practicalAdvice: 'Strike out "even if caused in whole or in part by the active or passive negligence of Landlord" and replace with "except to the extent caused by the gross negligence or willful misconduct of Landlord".',
        favorsParty: 'heavily_one_sided'
      }
    ],
    risks: [
      {
        id: 'risk-1',
        clauseRef: 'Section 3',
        title: 'Sneaky 60-Day Auto-Renewal Trap with 15% Price Hike',
        severity: 'critical',
        category: 'termination_lockin',
        description: 'Failing to send a physical certified letter 60 days before termination locks tenant into another 12 months with a 15% rent hike.',
        originalExcerpt: 'Unless Tenant delivers written notice of intention to vacate via certified registered mail... automatically renew for an additional twelve (12) month term... minimum mandatory fifteen percent (15%) escalation.',
        hiddenTrapExplanation: 'Most renters assume standard 30-day notice or an email notification is sufficient. Missing the window binds the tenant to paying roughly $33,800 over the next year.',
        mitigationRecommendation: 'Calendar the deadline for December 1, 2025. Propose replacing certified mail with standard email confirmation and changing 60 days to 30 days.',
        negotiationCounterOffer: 'Section 3: Tenant may provide notice of non-renewal via email to landlord@apexrealty.com with thirty (30) days prior notice.'
      },
      {
        id: 'risk-2',
        clauseRef: 'Section 6',
        title: 'Shifting Landlord Negligence Liability onto Tenant',
        severity: 'critical',
        category: 'liability_indemnity',
        description: 'Tenant assumes financial responsibility for landlord accidents and negligence.',
        originalExcerpt: '...even if caused in whole or in part by the active or passive negligence of Landlord.',
        hiddenTrapExplanation: 'If a pipe bursts because the landlord ignored maintenance, the landlord could attempt to make your renter’s insurance pay for building repairs and attorney fees.',
        mitigationRecommendation: 'Demand removal of the landlord negligence indemnity. Such clauses are void against public policy in many states.',
        negotiationCounterOffer: 'Section 6: In no event shall Tenant indemnify Landlord for claims arising from Landlord\'s negligence, omission, or breach of law.'
      },
      {
        id: 'risk-3',
        clauseRef: 'Section 5',
        title: 'Zero-Notice Landlord Entry Right',
        severity: 'high',
        category: 'rights_waiver',
        description: 'Landlord can enter your private home between 7am and 10pm without any prior notice.',
        originalExcerpt: '...retain the absolute and unconditioned right to enter the Premises at any hour between 7:00 AM and 10:00 PM without prior notice...',
        hiddenTrapExplanation: 'Completely deprives you of privacy and permits surprise intrusions for non-emergency showings.',
        mitigationRecommendation: 'Request modification to require minimum 24 hours advance written notice for all non-emergency entries.',
        negotiationCounterOffer: 'Section 5: Landlord shall provide at least twenty-four (24) hours advance written or email notice prior to any non-emergency entry.'
      },
      {
        id: 'risk-4',
        clauseRef: 'Section 2',
        title: 'Excessive 10% Late Fee Penalty',
        severity: 'medium',
        category: 'financial_penalty',
        description: 'A $200+ late fee after just 5 days exceeds statutory limits in many jurisdictions.',
        originalExcerpt: '...late fee equal to 10% of the overdue balance or $200.00, whichever is greater...',
        hiddenTrapExplanation: 'Under New York Real Property Law § 238-a, late fees cannot exceed $50 or 5% of monthly rent, making this clause legally unenforceable in NY.',
        mitigationRecommendation: 'Negotiate the fee down to statutory cap ($50 maximum in NY) or 5%.',
        negotiationCounterOffer: 'Section 2: Late fee shall not exceed $50.00 or 5% of monthly rent, whichever is less, assessed after a ten (10) day grace period.'
      }
    ],
    inconsistencies: [
      {
        id: 'incon-1',
        title: 'Notice Transmission Conflict (Certified Mail vs Electronic Portal)',
        sectionA: 'Section 3 (Renewal Notice)',
        quoteA: 'Unless Tenant delivers written notice of intention to vacate via certified registered mail... Verbal notice or electronic mail transmission shall be deemed strictly null and void.',
        sectionB: 'Section 14 (Standard Communications)',
        quoteB: 'All routine communications, notices, and repair requests shall be transmitted exclusively through the Landlord Resident Portal.',
        conflictAnalysis: 'Section 14 instructs the tenant that all notices go through the resident portal, but Section 3 secretly invalidates electronic notices for move-out. If a tenant submits their move-out request via the portal, the landlord could claim it was legally null and force the auto-renewal.',
        suggestedClarification: 'Explicitly amend Section 3 to state that move-out notices submitted through the Landlord Resident Portal or sent via verified email constitute valid binding written notice.'
      }
    ],
    options: [
      {
        id: 'opt-scenario-1',
        scenarioTitle: 'You Need to Break the Lease 4 Months Early Due to a Job Relocation',
        userQuestion: 'What are my options under this agreement if my employer transfers me to another state in June?',
        paths: [
          {
            title: 'Option A: Request Landlord Mitigation & Mutual Surrender',
            description: 'Notify the landlord in writing immediately. Under most state laws (e.g., NY Real Property Law § 227-e), landlords have a mandatory legal duty to mitigate damages by making reasonable efforts to re-rent the apartment.',
            consequence: 'You only pay rent until a replacement tenant moves in, plus reasonable advertising expenses. Minimizes total out-of-pocket loss.',
            riskTier: 'safe',
            actionSteps: [
              'Give formal 30-day written notice explaining employer transfer.',
              'Provide 2-3 qualified replacement applicants from your own network.',
              'Request a formal "Mutual Lease Surrender and Release" agreement in writing.'
            ],
            contractReference: 'Section 1 & State Mitigation Statues'
          },
          {
            title: 'Option B: Propose Qualified Sublease / Assignment',
            description: 'Find a solvent replacement tenant to take over your remaining lease term.',
            consequence: 'Section 9 of standard leases often allows assignment subject to landlord approval. If landlord unreasonably refuses a solvent candidate, you may be released from further lease liability.',
            riskTier: 'moderate',
            actionSteps: [
              'Check building sublet policies and application fees.',
              'Submit candidate financial profile to landlord.',
              'Ensure candidate signs assignment of lease agreement.'
            ],
            contractReference: 'Section 9 (Assignment & Subletting)'
          },
          {
            title: 'Option C: Simply Stop Paying and Walk Away (High Danger)',
            description: 'Vacating without mutual agreement or settlement.',
            consequence: 'Landlord can accelerate remaining rent balance ($19,600+), retain full security deposit, send balance to debt collections damaging credit, and trigger holdover/collection attorney fees.',
            riskTier: 'high_risk',
            actionSteps: [
              'Do NOT choose this option without consulting a tenant rights attorney or legal aid clinic first.'
            ],
            contractReference: 'Section 12 (Default and Acceleration)'
          }
        ]
      },
      {
        id: 'opt-scenario-2',
        scenarioTitle: 'Landlord Shows Up Unannounced at 8:00 AM with Contractors',
        userQuestion: 'Can I legally refuse entry to the landlord and their contractors when they show up without warning?',
        paths: [
          {
            title: 'Option A: Politely Decline and Demand 24-Hour Notice (Recommended)',
            description: 'State that while the lease mentions access, municipal tenant protection laws require reasonable advance written notice for non-emergency inspections.',
            consequence: 'Protects privacy and sets firm boundary. Landlord cannot evict you for demanding statutory notice.',
            riskTier: 'safe',
            actionSteps: [
              'Ask if there is an active emergency (gas leak, flooding).',
              'If not an emergency, cite the local housing code requiring 24 hours notice.',
              'Follow up with a calm, timestamped email documenting the unannounced visit.'
            ],
            contractReference: 'Section 5 vs Municipal Housing Privacy Statues'
          },
          {
            title: 'Option B: Allow Entry While Documenting Irregularities',
            description: 'Permit entry to avoid immediate conflict, but accompany the contractors and log everything.',
            consequence: 'Immediate access granted, but reinforces landlord habit of entering without notice.',
            riskTier: 'moderate',
            actionSteps: [
              'Stay present in the room during the entire inspection.',
              'Send written note reiterating that future visits require 24h scheduling.'
            ],
            contractReference: 'Section 5'
          }
        ]
      }
    ],
    checklist: {
      preSigningTasks: [
        {
          id: 'tsk-1',
          task: 'Strike out the Landlord Negligence Indemnity in Section 6',
          priority: 'must_do',
          done: false,
          explanation: 'Never sign a clause that forces you to pay legal bills if the landlord was the negligent party.'
        },
        {
          id: 'tsk-2',
          task: 'Negotiate Section 3 Notice from 60 days certified mail down to 30 days email',
          priority: 'must_do',
          done: false,
          explanation: 'Physical certified mail notice traps are the #1 cause of accidental lease renewal.'
        },
        {
          id: 'tsk-3',
          task: 'Cap late fee at $50 per local statutory regulations',
          priority: 'recommended',
          done: false,
          explanation: 'The current 10% / $200 fee is likely unlawful under state tenant protection laws.'
        },
        {
          id: 'tsk-4',
          task: 'Conduct video walkthrough and document pre-existing scuffs before signing',
          priority: 'recommended',
          done: true,
          explanation: 'Vital proof to protect your security deposit from unjustified deductions upon move-out.'
        }
      ],
      criticalDates: [
        {
          id: 'dt-1',
          event: 'Non-Renewal Written Notice Deadline (Certified Mail Postmark)',
          deadlineWindow: 'On or before December 2, 2025 (60 days before expiration)',
          penaltyIfMissed: 'Automatic renewal for 12 months at 15% rent increase (~$33,810 total commitment)',
          recommendedReminderDate: 'November 15, 2025'
        },
        {
          id: 'dt-2',
          event: 'Monthly Rent Due Date',
          deadlineWindow: '1st of each month (Grace period ends on the 5th)',
          penaltyIfMissed: '$200 late fee plus 1.5% monthly compounded interest',
          recommendedReminderDate: 'Last business day of preceding month'
        },
        {
          id: 'dt-3',
          event: 'Final Move-Out & Key Handover',
          deadlineWindow: 'January 31, 2026 by 12:00 PM',
          penaltyIfMissed: 'Holdover fee of 200% per diem ($163.33/day) plus potential 3rd party damages',
          recommendedReminderDate: 'January 20, 2026'
        }
      ],
      redlineCounterProposals: [
        {
          id: 'red-1',
          originalClause: 'Unless Tenant delivers written notice of intention to vacate via certified registered mail to Landlord not less than sixty (60) days prior to the Expiration Date, this Agreement shall automatically renew...',
          proposedRevision: 'Tenant may provide written notice of non-renewal via email to landlord@apexrealty.com not less than thirty (30) days prior to the Expiration Date. In the absence of timely notice, tenancy shall continue on a month-to-month basis at the existing rent.',
          rationaleToProvide: 'Standard industry practice supports 30 days notice and month-to-month conversion rather than mandatory 12-month auto-lock.'
        },
        {
          id: 'red-2',
          originalClause: 'Tenant covenants and agrees to indemnify, defend, and hold harmless Landlord... even if caused in whole or in part by the active or passive negligence of Landlord.',
          proposedRevision: 'Each party shall be responsible for damages or injuries resulting from its own negligence or willful misconduct, and Tenant shall have no obligation to indemnify Landlord for Landlord\'s own fault.',
          rationaleToProvide: 'Indemnifying another party for their own negligence is commercially unreasonable and prohibited by standard housing statutes.'
        }
      ]
    },
    attorneyDossier: {
      clientName: 'Jane Doe',
      documentType: 'Residential Apartment Lease',
      executiveSummary: 'Client is reviewing an urban residential apartment lease containing several potentially unconscionable clauses regarding unilateral negligence indemnity, excessive late fees, zero-notice landlord entry rights, and an onerous 60-day certified mail auto-renewal clause.',
      overallRiskScore: 78,
      urgencyLevel: 'moderate_review_recommended',
      topQuestionsToAsk: [
        'Is the Section 6 provision requiring me to indemnify the landlord for their own negligence legally enforceable in our state?',
        'Does the 10% / $200 late fee in Section 2 violate local statutory late-fee caps (e.g. RPL § 238-a)?',
        'Can the landlord enforce the 60-day auto-renewal clause if state law requires specific statutory reminder notices before an auto-renewal takes effect?',
        'What specific redline wording should I submit to ensure electronic email notice is sufficient for non-renewal?',
        'If I refuse entry when the landlord arrives without 24 hours prior notice under Section 5, does that constitute a lease default?'
      ],
      flaggedClausesWithCitations: [
        {
          section: 'Section 6 (Indemnity)',
          issue: 'Shifts landlord\'s own negligence onto tenant and demands tenant pay landlord legal fees.',
          whyLawyerInputNeeded: 'Needs lawyer confirmation of state General Obligations Law regarding void indemnity clauses in residential leases.'
        },
        {
          section: 'Section 3 (Renewal Trap)',
          issue: 'Requires certified physical mail 60 days ahead or locks in 12 months with 15% hike.',
          whyLawyerInputNeeded: 'Verify whether state requires landlord to send a 15-30 day advance warning before automatic renewal triggers.'
        },
        {
          section: 'Section 5 (Access)',
          issue: 'Allows unannounced visits from 7am to 10pm and waives tenant right to quiet enjoyment.',
          whyLawyerInputNeeded: 'Confirm statutory standard notice requirement (typically 24 hours in writing).'
        }
      ],
      evidenceChecklist: [
        'Copy of full unsigned lease agreement with Section 2, 3, 5, and 6 highlighted',
        'Email thread with leasing agent regarding move-in date and deposit receipts',
        'Photos/videos from initial apartment tour showing current maintenance status',
        'City/state rent regulation status documentation for the building if applicable'
      ],
      estimatedTimeNeeded: '30 - 45 minutes consultation'
    }
  },
  {
    id: 'doc-lease-renewal-addendum',
    title: 'Lease Renewal Addendum & Modified Terms (2026)',
    documentType: 'Lease Agreement',
    partyA: 'Apex Metropolitan Realty LLC (Landlord)',
    partyB: 'Jane Doe (Tenant)',
    jurisdiction: 'State of New York / Standard US Urban',
    wordCount: 1980,
    fleschKincaidGrade: 16.5,
    legaleseDensityPercent: 44,
    overallRiskScore: 84,
    executiveSummary: 'A renewal amendment presented to the tenant after Year 1. It contains hidden sneaky revisions: base rent increased by $350 (14.3%), the grace period was cut from 5 days to 24 hours, an assigned covered parking spot was quietly revoked and changed to a $150/mo fee, and an aggressive mandatory binding arbitration clause with class action waiver was introduced.',
    fullText: `AMENDMENT AND LEASE EXTENSION AGREEMENT

THIS LEASE EXTENSION AGREEMENT (the "Extension") is made effective February 1, 2026, modifying the original Residential Lease Agreement dated January 15, 2025.

SECTION 1. EXTENDED TERM AND ADJUSTED RENT
The Lease term is hereby extended for an additional period of twelve (12) months through January 31, 2027. Monthly base rent shall be increased from $2,450.00 to $2,800.00 per month, payable promptly on the first (1st) day of each month.

SECTION 2. MODIFIED PAYMENT TERMS AND ACCELERATION
Rent shall be deemed delinquent if not received by 11:59 PM on the second (2nd) day of the calendar month (reducing the prior five-day grace period to twenty-four hours). A penalty of $150.00 shall apply immediately upon delinquency.

SECTION 3. PARKING AND COMMON AMENITIES
Section 8 of the original Lease is hereby amended. Parking Space #14 shall no longer be included in Base Rent. Tenant may elect to license Parking Space #14 on a month-to-month basis for an auxiliary amenity fee of $150.00 per month, subject to availability.

SECTION 4. DISPUTE RESOLUTION AND CLASS ACTION WAIVER
All disputes arising under this Extension or the original Lease shall be submitted to confidential, binding individual arbitration in Wilmington, Delaware. Tenant waives all rights to participate in any tenant association complaints, city housing agency administrative claims, or representative proceedings.`,
    clauses: [
      {
        id: 'cl-ren-1',
        clauseNumber: 'Section 1',
        sectionTitle: 'Rent Escalation (14.3% Jump)',
        originalText: 'Monthly base rent shall be increased from $2,450.00 to $2,800.00 per month...',
        plainEnglishText: 'Your monthly rent is going up by $350/month (a 14.3% increase), totaling $4,200 more per year.',
        keyObligation: 'Pay $2,800/month starting Feb 1, 2026.',
        riskLevel: 'high',
        jargonTerms: [],
        practicalAdvice: 'Check if the building is subject to local rent stabilization laws or municipal rent caps before signing.',
        favorsParty: 'counterparty'
      },
      {
        id: 'cl-ren-2',
        clauseNumber: 'Section 2',
        sectionTitle: 'Grace Period Reduction (5 Days to 24 Hours)',
        originalText: 'Rent shall be deemed delinquent if not received by 11:59 PM on the second (2nd) day of the calendar month (reducing the prior five-day grace period to twenty-four hours).',
        plainEnglishText: 'The landlord took away your 5-day grace period. If bank transfers take 48 hours or the 1st falls on a Sunday/holiday, you get hit with a $150 penalty.',
        keyObligation: 'Rent must arrive by the 2nd day of the month.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Grace Period',
            definition: 'A period immediately following the payment deadline during which late penalties are waived.',
            plainMeaning: 'Extra buffer days before you get fined.'
          }
        ],
        practicalAdvice: 'Demand restoration of the standard 5-day grace period; automated bank clearing can easily take 1-2 business days.',
        favorsParty: 'heavily_one_sided'
      },
      {
        id: 'cl-ren-3',
        clauseNumber: 'Section 3',
        sectionTitle: 'Stripping of Parking Amenity',
        originalText: 'Parking Space #14 shall no longer be included in Base Rent. Tenant may elect to license Parking Space #14 on a month-to-month basis for an auxiliary amenity fee of $150.00 per month...',
        plainEnglishText: 'Your free assigned parking space was quietly stripped from the contract. If you still want to park your car, you must pay an extra $150/month ($1,800/yr). Combined with rent, your real cost jumps to $2,950/mo.',
        keyObligation: 'Pay $150/mo extra for your existing parking spot or lose access.',
        riskLevel: 'high',
        jargonTerms: [],
        practicalAdvice: 'Highlight that parking was an inducement in the original lease and request that parking remain included at the new rent price.',
        favorsParty: 'counterparty'
      }
    ],
    risks: [
      {
        id: 'risk-ren-1',
        clauseRef: 'Section 2',
        title: 'Unrealistic 24-Hour Grace Period Trap',
        severity: 'critical',
        category: 'financial_penalty',
        description: 'Rent marked late after 24 hours with an immediate $150 fee.',
        originalExcerpt: '...reducing the prior five-day grace period to twenty-four hours...',
        hiddenTrapExplanation: 'Direct deposits or bank ACH transfers frequently experience weekend and bank holiday delays, making unavoidable late fees nearly certain.',
        mitigationRecommendation: 'Insist on maintaining the original 5-day grace period.',
        negotiationCounterOffer: 'Section 2: The five (5) day grace period from the original agreement shall remain in full force.'
      }
    ],
    inconsistencies: [],
    options: [],
    checklist: {
      preSigningTasks: [],
      criticalDates: [],
      redlineCounterProposals: []
    },
    attorneyDossier: {
      clientName: 'Jane Doe',
      documentType: 'Lease Renewal Addendum',
      executiveSummary: 'Client faced with 14% rent increase, elimination of parking amenity, and reduction of payment grace period.',
      overallRiskScore: 84,
      urgencyLevel: 'immediate_counsel_advised',
      topQuestionsToAsk: [
        'Does local law allow eliminating an established included service (parking) without a corresponding rent reduction?',
        'Is a 24-hour grace period permissible under state tenancy statutes?'
      ],
      flaggedClausesWithCitations: [],
      evidenceChecklist: ['Original 2025 Lease', 'Proposed 2026 Extension Addendum'],
      estimatedTimeNeeded: '20 minutes'
    }
  },
  {
    id: 'doc-saas-msa',
    title: 'Enterprise B2B Cloud SaaS Master Services Agreement',
    documentType: 'SaaS Terms of Service',
    partyA: 'CloudVanguard Technologies Inc. (Vendor)',
    partyB: 'InnovateCorp Enterprises (Customer)',
    jurisdiction: 'State of Delaware',
    wordCount: 4620,
    fleschKincaidGrade: 18.2,
    legaleseDensityPercent: 52,
    overallRiskScore: 82,
    executiveSummary: 'Vendor-biased enterprise cloud software agreement containing an asymmetric liability cap (customer faces uncapped indemnification while vendor caps liability at 1 month of fees), unlimited vendor IP license over customer uploaded data, unilateral price increase rights upon renewal, and strict waiver of consequential damages leaving customer uncompensated for data breaches.',
    fullText: `MASTER CLOUD SERVICES AGREEMENT (MSA)

This Master Cloud Services Agreement ("Agreement") is entered into between CloudVanguard Technologies Inc. ("Vendor") and the entity purchasing subscriptions hereunder ("Customer").

1. SUBSCRIPTION AND ACCESS RIGHTS
Vendor grants Customer a limited, non-exclusive, non-transferable right to access and use the Cloud Platform solely for internal business operations during the applicable Subscription Term.

2. FEES, INVOICING AND UNILATERAL ESCALATION
Customer shall pay all fees specified in applicable Order Forms. Subscription fees are non-refundable. Vendor reserves the unilateral right to increase subscription fees at the conclusion of any Subscription Term by providing electronic notice not less than fifteen (15) days prior to renewal. Renewal shall occur automatically unless Customer provides sixty (60) days advance notice of termination.

3. CUSTOMER DATA AND INTELLECTUAL PROPERTY GRANT
Customer retains ownership of raw Customer Data. However, Customer hereby grants to Vendor a worldwide, perpetual, irrevocable, royalty-free, transferable license to use, modify, adapt, aggregate, and train machine learning and artificial intelligence models on all Customer Data, telemetry, and workflow inputs submitted to the Platform.

4. LIMITATION OF LIABILITY
IN NO EVENT SHALL VENDOR'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, EXCEED THE ACTUAL FEES PAID BY CUSTOMER TO VENDOR IN THE ONE (1) MONTH PRECEDING THE EVENT GIVING RISE TO LIABILITY. VENDOR SHALL HAVE ZERO LIABILITY FOR LOSS OF PROFITS, DATA CORRUPTION, OR BUSINESS INTERRUPTION.

5. CUSTOMER INDEMNIFICATION OBLIGATIONS
Customer shall defend, indemnify, and hold harmless Vendor, its officers, directors, and employees from and against any third-party claims, investigations, damages, or fines arising from: (a) Customer Data; (b) Customer's alleged violation of data privacy laws; or (c) any breach of this Agreement by Customer or its authorized users. Customer's indemnification liability hereunder shall be entirely uncapped.`,
    clauses: [
      {
        id: 'cl-saas-1',
        clauseNumber: 'Section 3',
        sectionTitle: 'Perpetual AI Training License on Customer Data',
        originalText: 'Customer hereby grants to Vendor a worldwide, perpetual, irrevocable, royalty-free, transferable license to use, modify, adapt, aggregate, and train machine learning and artificial intelligence models on all Customer Data...',
        plainEnglishText: 'You give the vendor permanent, free permission to feed your confidential company data, documents, and trade secrets into their artificial intelligence models. Even if you cancel your subscription, they keep your data forever.',
        keyObligation: 'Permanently surrenders proprietary rights over data fed into the software.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Perpetual & Irrevocable',
            definition: 'Lasting forever and incapable of being canceled or revoked.',
            plainMeaning: 'Forever, with no way to take it back.'
          },
          {
            term: 'Royalty-Free',
            definition: 'Without requiring any payment of ongoing royalties or compensation.',
            plainMeaning: 'They do not pay you a penny for using your valuable data.'
          }
        ],
        practicalAdvice: 'Cross this out immediately. Insert explicit prohibition against using Customer Data or PII for model training.',
        favorsParty: 'heavily_one_sided'
      },
      {
        id: 'cl-saas-2',
        clauseNumber: 'Section 4',
        sectionTitle: 'Asymmetric 1-Month Liability Cap',
        originalText: 'IN NO EVENT SHALL VENDOR\'S TOTAL AGGREGATE LIABILITY... EXCEED THE ACTUAL FEES PAID BY CUSTOMER TO VENDOR IN THE ONE (1) MONTH PRECEDING THE EVENT GIVING RISE TO LIABILITY.',
        plainEnglishText: 'If the vendor suffers a catastrophic security breach, leaks your client records, or deletes your database, the maximum amount you can ever recover is what you paid them last month (e.g. $500). Meanwhile, your company could suffer millions in damages.',
        keyObligation: 'Customer bears virtually 100% of financial risk if vendor software fails.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Aggregate Liability',
            definition: 'The total cumulative amount of damages a party can be forced to pay across all claims.',
            plainMeaning: 'The highest possible ceiling on how much money you can sue for.'
          }
        ],
        practicalAdvice: 'Standard enterprise negotiations require a 12-month trailing fee cap and an elevated "super-cap" (3x to 5x or $2M+) for data breaches and confidentiality failures.',
        favorsParty: 'heavily_one_sided'
      }
    ],
    risks: [
      {
        id: 'risk-saas-1',
        clauseRef: 'Section 3',
        title: 'Customer Proprietary Data Fed to Vendor AI Models',
        severity: 'critical',
        category: 'ip_ownership',
        description: 'Vendor takes perpetual, irrevocable right to train AI on Customer confidential data.',
        originalExcerpt: '...perpetual, irrevocable, royalty-free, transferable license to use... and train machine learning and artificial intelligence models on all Customer Data...',
        hiddenTrapExplanation: 'Confidential corporate documents uploaded to the tool could be exposed through model outputs or retained indefinitely.',
        mitigationRecommendation: 'Demand a complete opt-out of AI training and require immediate data deletion upon contract termination.',
        negotiationCounterOffer: 'Vendor shall not use, share, or process Customer Data to train, fine-tune, or improve any public or proprietary machine learning or AI models.'
      }
    ],
    inconsistencies: [],
    options: [],
    checklist: {
      preSigningTasks: [],
      criticalDates: [],
      redlineCounterProposals: []
    },
    attorneyDossier: {
      clientName: 'InnovateCorp Enterprises',
      documentType: 'Cloud SaaS Master Services Agreement',
      executiveSummary: 'Enterprise software agreement with severely unbalanced risk distribution, 1-month vendor liability cap, and unrestricted perpetual AI training rights on confidential corporate data.',
      overallRiskScore: 82,
      urgencyLevel: 'immediate_counsel_advised',
      topQuestionsToAsk: [
        'How can we enforce an exclusion of Customer Confidential Information and PII from Vendor\'s AI training pipeline?',
        'What is market standard for liability super-caps in enterprise cloud agreements of this tier?',
        'Does the unilateral price escalation clause comply with commercial fair-dealing standards?'
      ],
      flaggedClausesWithCitations: [],
      evidenceChecklist: ['Full Vendor MSA Draft', 'Security & Data Processing Addendum (DPA)'],
      estimatedTimeNeeded: '45 minutes'
    }
  },
  {
    id: 'doc-contractor-ip',
    title: 'Independent Contractor Services & IP Assignment Agreement',
    documentType: 'Freelance Agreement',
    partyA: 'Apex HyperScale Ventures LLC (Client)',
    partyB: 'Alex Rivers (Contractor)',
    jurisdiction: 'State of California',
    wordCount: 2950,
    fleschKincaidGrade: 15.9,
    legaleseDensityPercent: 41,
    overallRiskScore: 74,
    executiveSummary: 'Contractor agreement seeking to assign all prior and future inventions developed by the contractor (even on personal time or prior to signing), enforcing a 2-year non-compete within a 50-mile radius (largely unenforceable in CA under Bus. & Prof. Code § 16600, but threatening), and placing uncapped indemnification onto the independent freelancer.',
    fullText: `INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is made as of March 10, 2025, between APEX HYPERSCALE VENTURES LLC ("Company") and ALEX RIVERS ("Contractor").

1. ENGAGEMENT AND SERVICES
Contractor shall perform software architecture and user experience design services as detailed in Statements of Work.

2. WORK PRODUCT AND ASSIGNMENT OF ALL INVENTIONS
Contractor hereby irrevocably assigns to Company all right, title, and interest worldwide in and to all inventions, code, designs, algorithms, and documentation created, conceived, or reduced to practice by Contractor during the term of this Agreement, whether created on Company equipment or on Contractor's personal devices, and whether during business hours or personal time. Contractor further assigns all prior works of authorship created within the past twelve (12) months.

3. RESTRICTIVE COVENANTS AND NON-COMPETITION
During the term of this Agreement and for a period of twenty-four (24) months thereafter, Contractor shall not directly or indirectly engage in, perform services for, consult for, or invest in any business entity operating in the same industry or competing with Company within a fifty (50) mile radius.

4. INDEPENDENT CONTRACTOR STATUS AND TAXES
Contractor acknowledges contractor status and agrees to indemnify and defend Company from any tax assessments, employment benefit claims, or worker reclassification penalties.`,
    clauses: [
      {
        id: 'cl-cont-1',
        clauseNumber: 'Section 2',
        sectionTitle: 'Overreaching Assignment of Personal & Prior Inventions',
        originalText: 'Contractor hereby irrevocably assigns to Company all right, title, and interest... whether created on Company equipment or on Contractor\'s personal devices, and whether during business hours or personal time. Contractor further assigns all prior works of authorship created within the past twelve (12) months.',
        plainEnglishText: 'The company is trying to own everything you created on your own personal laptop during your free time—even projects and code you wrote a year before you ever met them!',
        keyObligation: 'Surrenders ownership of private side-projects and past software libraries.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Reduced to Practice',
            definition: 'The creation of a working embodiment or implementation of an idea.',
            plainMeaning: 'Built or written into actual working software.'
          }
        ],
        practicalAdvice: 'Attach an explicit "Schedule A: Excluded Prior Inventions" listing your existing repositories, side-projects, and open source tools.',
        favorsParty: 'heavily_one_sided'
      },
      {
        id: 'cl-cont-2',
        clauseNumber: 'Section 3',
        sectionTitle: '2-Year Broad Non-Compete Restriction',
        originalText: '...for a period of twenty-four (24) months thereafter, Contractor shall not directly or indirectly engage in, perform services for, consult for, or invest in any business entity operating in the same industry...',
        plainEnglishText: 'The company wants to ban you from working for any other client in your field for 2 full years after the project ends.',
        keyObligation: 'Prohibited from earning a living in your industry for 24 months.',
        riskLevel: 'critical',
        jargonTerms: [
          {
            term: 'Restrictive Covenant',
            definition: 'A contractual restriction limiting a party\'s future business or professional freedom.',
            plainMeaning: 'A rule banning you from working where you choose.'
          }
        ],
        practicalAdvice: 'In California, non-competes are void and unlawful under Cal. Bus. & Prof. Code § 16600. Request immediate deletion of Section 3.',
        favorsParty: 'heavily_one_sided'
      }
    ],
    risks: [
      {
        id: 'risk-cont-1',
        clauseRef: 'Section 2',
        title: 'Seizure of Personal Side-Projects & Pre-Existing Code',
        severity: 'critical',
        category: 'ip_ownership',
        description: 'Assigns personal off-hours creations and prior 12 months of intellectual property.',
        originalExcerpt: '...whether created on Company equipment or on Contractor\'s personal devices... assigns all prior works of authorship created within the past twelve (12) months.',
        hiddenTrapExplanation: 'Signing this could legally forfeit rights to your own startup, freelance templates, or open-source libraries.',
        mitigationRecommendation: 'Limit assignment strictly to deliverables explicitly defined and paid for in an executed SOW.',
        negotiationCounterOffer: 'Section 2: Contractor assigns only the specific final deliverables authored exclusively for Company pursuant to a written Statement of Work upon receipt of full payment.'
      }
    ],
    inconsistencies: [],
    options: [],
    checklist: {
      preSigningTasks: [],
      criticalDates: [],
      redlineCounterProposals: []
    },
    attorneyDossier: {
      clientName: 'Alex Rivers',
      documentType: 'Contractor IP Agreement',
      executiveSummary: 'Independent software architect presented with overbroad IP assignment clause capturing personal projects and void post-employment non-compete.',
      overallRiskScore: 74,
      urgencyLevel: 'immediate_counsel_advised',
      topQuestionsToAsk: [
        'How should I carve out my pre-existing open-source libraries from the IP assignment clause?',
        'Does the inclusion of the unlawful California non-compete clause expose the company to statutory penalties under AB 1076?'
      ],
      flaggedClausesWithCitations: [],
      evidenceChecklist: ['Git repository timestamps for prior personal projects', 'Client SOW draft'],
      estimatedTimeNeeded: '30 minutes'
    }
  }
];

export const SAMPLE_COMPARISON: {
  docAId: string;
  docBId: string;
  docATitle: string;
  docBTitle: string;
  summary: string;
  varianceScore: number; // 0 - 100
  criticalAlertCount: number;
  diffs: ClauseDiff[];
} = {
  docAId: 'doc-lease-standard',
  docBId: 'doc-lease-renewal-addendum',
  docATitle: 'Original 2025 Lease',
  docBTitle: 'Proposed 2026 Renewal Addendum',
  summary: 'Comparing the 2025 Base Lease against the 2026 Renewal Addendum reveals 4 substantial financial and legal shifts. Base rent increases by 14.3% ($350/mo), the 5-day grace period is reduced to 24 hours, the included parking spot is removed and transformed into an auxiliary $150/mo fee, and an aggressive mandatory binding arbitration venue in Delaware is introduced.',
  varianceScore: 68,
  criticalAlertCount: 3,
  diffs: [
    {
      clauseId: 'diff-1',
      clauseTitle: 'Monthly Base Rent',
      docAText: 'Section 2: Tenant agrees to pay monthly base rent of $2,450.00 in advance on or before the first (1st) day of each calendar month.',
      docBText: 'Section 1: Monthly base rent shall be increased from $2,450.00 to $2,800.00 per month, payable promptly on the first (1st) day of each month.',
      changeType: 'modified',
      impactAnalysis: 'Net increase of $350.00 per month (+$4,200.00 annually), representing a 14.28% jump.',
      favorability: 'favors_doc_a',
      sneakyAlert: 'Check local municipal rent increase caps; some cities limit annual residential increases to 3% - 8%.'
    },
    {
      clauseId: 'diff-2',
      clauseTitle: 'Payment Grace Period & Late Penalty',
      docAText: 'Section 2: In the event rent is received after the fifth (5th) day of the month, Tenant shall pay a late fee equal to 10%...',
      docBText: 'Section 2: Rent shall be deemed delinquent if not received by 11:59 PM on the second (2nd) day of the calendar month (reducing the prior five-day grace period to twenty-four hours). A penalty of $150.00 shall apply immediately.',
      changeType: 'modified',
      impactAnalysis: 'Grace period eliminated from 5 calendar days down to 24 hours. Weekend or holiday ACH banking delays will automatically trigger a $150 penalty.',
      favorability: 'critical_risk',
      sneakyAlert: 'Extreme trap: Bank ACH transfers often take 2 business days. If the 1st is on a Saturday, payment will be marked late on Monday.'
    },
    {
      clauseId: 'diff-3',
      clauseTitle: 'Assigned Parking Space #14',
      docAText: 'Section 8: Base Rent includes the exclusive right to park one (1) standard vehicle in designated Space #14 at no additional fee.',
      docBText: 'Section 3: Parking Space #14 shall no longer be included in Base Rent. Tenant may elect to license Parking Space #14 on a month-to-month basis for an auxiliary amenity fee of $150.00 per month.',
      changeType: 'removed',
      impactAnalysis: 'De-bundling of parking service adds an effective $1,800/yr to tenant living expenses while depriving tenant of guaranteed spot.',
      favorability: 'favors_doc_a',
      sneakyAlert: 'Quiet amenity stripping effectively increases tenant overall housing cost by 20.4% ($500/mo total combined).'
    },
    {
      clauseId: 'diff-4',
      clauseTitle: 'Dispute Resolution & Forum Venue',
      docAText: 'Section 8: Any controversy... resolved through confidential binding arbitration administered by the American Arbitration Association.',
      docBText: 'Section 4: All disputes... shall be submitted to confidential, binding individual arbitration in Wilmington, Delaware. Tenant waives all rights to participate in any tenant association complaints, city housing agency claims...',
      changeType: 'modified',
      impactAnalysis: 'Forces a local New York resident to arbitrate apartment disputes out-of-state in Wilmington, Delaware, and explicitly attempts to block tenant from filing complaints with municipal housing code enforcement agencies.',
      favorability: 'critical_risk',
      sneakyAlert: 'Waiver of municipal housing authority rights is strictly illegal and void under tenant protection statutes.'
    }
  ]
};
