export type academicStatusesType = {
  Freshman: number;
  Sophomore: number;
  Junior: number;
  Senior: number;
  "Recent Graduate": number;
};

export type adNoticeType = {
  "Google Search": number;
  Facebook: number;
  Youtube: number;
  "Friends/family": number;
  Others: number;
};

export type comittmentsType = {
  "3 min / day": string;
  "10 min / day": string;
  "15 min / day": string;
  "30 min / day": string;
};

export type profilingDataType = {
  countryExam: "PNLE" | "NCLEX-RN" | "NCLEX-PN" | "";
  appNotice: keyof adNoticeType | "";
  academicStatus: keyof academicStatusesType | "";
  goal:
    | "Build foundational knowledge"
    | "Strengthen clinical skills"
    | "Prepare for PNLE"
    | "";
  comittment: keyof comittmentsType | "";
  start: "scratch" | "personalized" | "";
};
