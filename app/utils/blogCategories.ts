// app/utils/blogCategories.ts

// Define the allowed badge color types
export type UBadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

function normalizeLabel(label: string): string {
  return label.replace(/\s+/g, '').replace(/^[A-Z]/, l => l.toLowerCase())
}

// This function returns a badge color based on the subcategory label by mapping it to a MAGIC category first.
export function getTagColor(label: string): UBadgeColor {
  const normalized = normalizeLabel(label);
  const magicCategory = subCategoryToMagicCategory[normalized] || 'Alignment';
  return magicColorMap[magicCategory] || 'neutral';
}

const magicColorMap: Record<string, UBadgeColor> = {
  Media: 'secondary',
  Alignment: 'info',
  Growth: 'success',
  Infrastructure: 'warning',
  Care: 'error'
};

const subCategoryToMagicCategory: Record<string, keyof typeof magicColorMap> = {
  // Alignment
  notion: 'Alignment',
  strategy: 'Alignment',
  communication: 'Alignment',
  leadership: 'Alignment',
  documentation: 'Alignment',
  okrs: 'Alignment',
  meetings: 'Alignment',
  planning: 'Alignment',
  organization: 'Alignment',
  collaboration: 'Alignment',

  // Growth
  sales: 'Growth',
  crm: 'Growth',
  business: 'Growth',
  leadGen: 'Growth',
  prospecting: 'Growth',
  kpis: 'Growth',
  goalSetting: 'Growth',
  closing: 'Growth',
  enablement: 'Growth',
  businessOptimization: 'Growth',
  aiInBusiness: 'Growth',

  // Media
  branding: 'Media',
  marketing: 'Media',
  design: 'Media',
  storytelling: 'Media',
  content: 'Media',
  campaigns: 'Media',
  visibility: 'Media',

  // Infrastructure
  systems: 'Infrastructure',
  automation: 'Infrastructure',
  operationalStrategy: 'Infrastructure',
  workflowAutomation: 'Infrastructure',
  processDesign: 'Infrastructure',
  erp: 'Infrastructure',
  sops: 'Infrastructure',
  documentationSystems: 'Infrastructure',
  techStack: 'Infrastructure',

  // Care
  hr: 'Care',
  wellness: 'Care',
  support: 'Care',
  feedback: 'Care',
  onboarding: 'Care',
  culture: 'Care',
  burnout: 'Care',
  experience: 'Care',

  // Fallback
  general: 'Alignment'
};

// A helper that returns the complete badge props for a given label.
export function getBadgeProps(label?: string): {
  label: string;
  color: UBadgeColor;
  variant: 'solid' | 'outline' | 'soft' | 'subtle';
} {
  const finalLabel = label ? label : 'General';
  return {
    label: finalLabel,
    color: getTagColor(finalLabel),
    variant: 'soft'
  };
}

export function getBadgePropsFromItem(item: { badge?: { label?: string } }) {
  const label = item.badge?.label || 'General'
  return {
    label,
    color: getTagColor(label),
    variant: 'soft' as const,
    class:
      'lgt-inset border border-gray-200 dark:border-gray-800 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-xs font-semibold shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.2)]'
  }
}

export const magicCategoryMap = (['Media', 'Alignment', 'Growth', 'Infrastructure', 'Care'] as const).reduce(
  (acc, category) => {
    acc[category] = Object.entries(subCategoryToMagicCategory)
      .filter(([_, cat]) => cat === category)
      .map(([sub]) => sub);
    return acc;
  },
  {} as Record<keyof typeof magicColorMap, string[]>
);