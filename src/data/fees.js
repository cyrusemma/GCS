export const feeStructure = {
  admissionFormFee: 200,
  tuition: {
    nursery: 670,
    kg: 580,
    primary: 680,
    jhs1_2: 770,
    jhs3: 820,
  },
  levies: {
    schoolDevelopment: 30,
    furnitureMaintenance: 35,
    fileReportCumulative: 35,
    ucMass: 100,
  },
  uniforms: {
    nurseryToPrimary: 250,
    jhs: 300,
    fridayWear: 100,
  },
  dailyFees: {
    feeding: 10,
    classLevy: 4,
  },
  totalsPerTerm: {
    nursery: 1470,
    kg: 1330,
    primary: 1530,
    jhs1_2: 1670,
    jhs3: 1720,
  },
  notes:
    "Feeding fee and class levy can be paid daily, weekly, monthly, or termly. Examination fees are determined during examination period. All fees are subject to review.",
}

export const admissionRequirements = {
  nurseryKG: [
    "Completed admission/application form",
    "Copy of the child's birth certificate",
    "Two recent passport-sized photographs",
    "Copy of the child's health record",
    "Payment of the prescribed admission fee",
  ],
  primaryJHS: [
    "Completed admission form",
    "Birth certificate",
    "Two recent passport-sized photographs",
    "Transfer letter from former school (if applicable)",
    "Parent/Guardian's identification and contact information",
    "Payment of admission and registration fees",
    "Successful performance in entrance examination",
  ],
}

export const compulsoryItems = {
  nursery: [
    "1 key soap before admission; 4 laundry soaps per term",
    "1 pack of toilet rolls and a big-size antiseptic (Dettol) — replenished every term",
    "A big-size mat (approx. GHC 150) and a bath-size baby towel",
    "A set of plastic bowls, spoon, and water bottle",
    "2 pampers/baby diapers per day",
    "Vaccination history/record",
  ],
  kg: [
    "A set of plastic plates, spoon, and water bottle (replaceable when necessary)",
    "1 pack of toilet rolls and 1 key soap — replenished every term",
  ],
  primary: [
    "A set of plastic plates, spoon, and water bottle (replaceable when necessary)",
    "1 pack of toilet rolls, 1 key soap, and 4 bathing soaps — replenished every term",
  ],
}
