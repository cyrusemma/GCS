// Central image URL map. Asset paths point to real school files in /public/assets.
export const ASSETS = {
  badge: "/assets/golden_crown_school_badge.png",
  building: "/assets/building_from_outside_view_of_golden_cr.webp",
  director: "/assets/director.jpg",
}

export const IMAGES = {
  // Hero
  hero_bg: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80",
  hero_students: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",

  // About
  about_classroom: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=80",
  about_principal: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
  about_students_group: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",

  // Academics
  academic_nursery: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
  academic_primary: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80",
  academic_jhs: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
  academic_ict: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",

  // Gallery
  gallery_1: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
  gallery_2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  gallery_3: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  gallery_4: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
  gallery_5: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80",
  gallery_6: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
  gallery_7: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
  gallery_8: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
  gallery_9: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=600&q=80",
  gallery_10: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80",
  gallery_11: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80",
  gallery_12: "https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=600&q=80",

  // Staff
  director: "/assets/director.jpg",
  staff_1: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80",
  staff_2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
  staff_3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
  staff_4: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  staff_5: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80",
  staff_6: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",

  // News
  news_1: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  news_2: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
  news_3: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=600&q=80",

  // Testimonials / parents
  parent_1: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  parent_2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  parent_3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
}

// Neutral gray placeholder for <img> onError fallbacks.
export const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='400'%3E%3Crect%20width='600'%20height='400'%20fill='%23e5e7eb'/%3E%3Ctext%20x='50%25'%20y='50%25'%20fill='%239ca3af'%20font-family='sans-serif'%20font-size='20'%20text-anchor='middle'%20dominant-baseline='middle'%3EGolden%20Crown%20School%3C/text%3E%3C/svg%3E"

export const onImgError = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG
}
