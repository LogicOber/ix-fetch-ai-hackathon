import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { EmotionPoint } from "@/types/audio";

type Phase = "Build Trust" | "Share Stories" | "Bridge Knowledge" | "Empower Choice" | "Community Care";

type DialogueEntry = {
  phase: Phase;
  speaker: "Doctor" | "Patient";
  text: string;
  type: string;
  isKeyPoint?: boolean;
};

const phaseColors: Record<Phase, { bg: string; text: string }> = {
  'Build Trust': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Share Stories': { bg: 'bg-green-50', text: 'text-green-700' },
  'Bridge Knowledge': { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  'Empower Choice': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Community Care': { bg: 'bg-rose-50', text: 'text-rose-700' }
};

interface TreatmentStrategyProps {
  hesitationPoints: EmotionPoint[];
}

const sampleDialogue: DialogueEntry[] = [
  {
    phase: "Build Trust",
    speaker: "Patient",
    text: "Here they come again, another outsider. You think your 'science' can teach us how to live? Our ways have sustained us for thousands of years.",
    type: "initial_resistance",
    isKeyPoint: true
  },
  {
    phase: "Build Trust",
    speaker: "Doctor",
    text: "I hear a deep distrust of outsiders in your voice. That caution makes sense - protecting traditions is vital.",
    type: "labeling_mirroring",
    isKeyPoint: true
  },
  {
    phase: "Build Trust",
    speaker: "Patient",
    text: "Don't trust you? Of course not. The mining companies came the same way, talking about 'help' and 'development'. Now our rivers are poisoned.",
    type: "expressing_distrust"
  },
  {
    phase: "Build Trust",
    speaker: "Doctor",
    text: "You're right, those companies did harm you. I can hear the anger and pain in your words. If you're willing, could you tell me more about what happened then?",
    type: "validation_inquiry",
    isKeyPoint: true
  },
  {
    phase: "Build Trust",
    speaker: "Patient",
    text: "...*long silence* They promised development and progress. Instead, our children got sick, couldn't even drink clean water. Now you come talking about injecting our children?",
    type: "revealing_trauma"
  },
  {
    phase: "Build Trust",
    speaker: "Doctor",
    text: "I hear your concern - you're protecting your children from harm. It reminds me of your blessing ceremony, always putting the children first.",
    type: "cultural_validation"
  },
  {
    phase: "Build Trust",
    speaker: "Patient",
    text: "*slightly relaxing* You know about our ceremonies?",
    type: "slight_opening",
    isKeyPoint: true
  },
  {
    phase: "Build Trust",
    speaker: "Doctor",
    text: "I've lived on this land for three years now. Each full moon, watching your blessing ceremonies moves me deeply - such respect for life. That's why I understand any change must first honor the wisdom of this land.",
    type: "demonstrating_respect"
  },
  {
    phase: "Build Trust",
    speaker: "Patient",
    text: "Three years...? *thinking* Were you the one who helped the old shaman with his grandson's fever?",
    type: "recognition"
  },
  {
    phase: "Build Trust",
    speaker: "Doctor",
    text: "Yes. I only watched and learned how he used the herbs. Only when he asked for my help did I step in.",
    type: "humble_presence"
  },
  {
    phase: "Build Trust",
    speaker: "Patient",
    text: "He mentioned you... said you're different from other outside doctors, at least you listen. But that doesn't mean we need to change.",
    type: "cautious_acknowledgment"
  },
  {
    phase: "Build Trust",
    speaker: "Doctor",
    text: "You're right, change should never be forced. I understand your desire to protect your community's traditions and values.",
    type: "mirroring_values"
  },
  {
    phase: "Share Stories",
    speaker: "Patient",
    text: "Last month, we lost a child... *voice trembling* The shaman says it's because the new-age evil spirits are getting stronger...",
    type: "sharing_pain",
    isKeyPoint: true
  },
  {
    phase: "Share Stories",
    speaker: "Doctor",
    text: "Losing a child is the most painful thing... I can feel the pain that's affecting the whole community. The shaman's words make sense - some diseases are indeed harder to fight now.",
    type: "acknowledging_pain",
    isKeyPoint: true
  },
  {
    phase: "Share Stories",
    speaker: "Patient",
    text: "What do you mean by 'harder to fight'?",
    type: "curiosity_emerging"
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Doctor",
    text: "Just like the river changes its course, diseases also change. I've noticed the shaman adjusting his herbal formulas, which shows he's also seen this change.",
    type: "metaphorical_bridge",
    isKeyPoint: true
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Patient",
    text: "Are you implying our methods aren't good enough?",
    type: "defensive_reaction"
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Doctor",
    text: "On the contrary. I see how the shaman adjusts his treatments based on each patient's differences, a wisdom often missing in modern medicine.",
    type: "affirming_wisdom"
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Patient",
    text: "But you still want us to accept your way?",
    type: "challenging"
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Doctor",
    text: "I'm thinking how both wisdoms can complement each other. Just as you use both prayer ceremonies and improved irrigation systems during droughts.",
    type: "cultural_parallel"
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Patient",
    text: "*long silence* The woman from the next village, Maya, she said something similar...",
    type: "contemplating"
  },
  {
    phase: "Bridge Knowledge",
    speaker: "Doctor",
    text: "Maya is indeed wise. She told me she sees new methods as another tool from the ancestors, just like when they taught you new herbs.",
    type: "bridging_example"
  },
  {
    phase: "Empower Choice",
    speaker: "Patient",
    text: "But if we accept this... won't it make our young people disregard tradition even more? They barely learn the ancient healing arts anymore.",
    type: "fear_of_loss",
    isKeyPoint: true
  },
  {
    phase: "Empower Choice",
    speaker: "Doctor",
    text: "I hear your concern about preserving tradition. Would it help if the shaman decided how to combine both methods?",
    type: "empowering_suggestion",
    isKeyPoint: true
  },
  {
    phase: "Empower Choice",
    speaker: "Patient",
    text: "*thoughtful* You mean let the shaman control the process?",
    type: "considering_control"
  },
  {
    phase: "Empower Choice",
    speaker: "Doctor",
    text: "Yes. Just as he's always guided the community. Maybe he'll have unique insights on how to protect tradition while adding new tools.",
    type: "reinforcing_authority"
  },
  {
    phase: "Community Care",
    speaker: "Patient",
    text: "...tell me about the other villages. Are their traditions still alive?",
    type: "seeking_evidence",
    isKeyPoint: true
  },
  {
    phase: "Community Care",
    speaker: "Doctor",
    text: "I understand you want to know about other villages' experiences. Why not visit and see for yourself? Especially Maya's village, to see how they've combined old and new wisdom?",
    type: "offering_verification",
    isKeyPoint: true
  },
  {
    phase: "Community Care",
    speaker: "Patient",
    text: "Maybe... maybe we can discuss it with the shaman first. He always says 'wisdom is like a river, always getting new streams'...",
    type: "opening_possibility"
  },
  {
    phase: "Community Care",
    speaker: "Doctor",
    text: "That metaphor is so fitting. Just as a river doesn't lose its nature with new streams, but becomes richer.",
    type: "affirming_metaphor"
  },
  {
    phase: "Community Care",
    speaker: "Patient",
    text: "There's a council meeting at the next full moon... perhaps you could come, hear what everyone thinks. Though I make no promises they'll agree.",
    type: "cautious_invitation",
    isKeyPoint: true
  },
  {
    phase: "Community Care",
    speaker: "Doctor",
    text: "I'm grateful for the invitation. Whatever the outcome, what matters most is respecting your community's decision.",
    type: "respectful_acceptance"
  }
];

const checklist = [
  {
    title: "Cultural Understanding & Respect",
    items: [
      "Research local spiritual beliefs and healing traditions",
      "Learn about community leadership structure and decision-making processes",
      "Understand the role of traditional healers and elders",
      "Document previous health interventions and community reactions"
    ]
  },
  {
    title: "Bridge Building Strategies",
    items: [
      "Identify shared values between traditional and modern medicine",
      "Collect success stories from similar cultural contexts",
      "Prepare relatable metaphors from local agriculture and nature",
      "Develop explanations that incorporate traditional wisdom"
    ]
  },
  {
    title: "Community Engagement",
    items: [
      "Plan meetings with village elders and spiritual leaders",
      "Organize community dialogue sessions",
      "Create opportunities for traditional healers' involvement",
      "Design culturally appropriate educational materials"
    ]
  },
  {
    title: "Practical Implementation",
    items: [
      "Establish support system for post-vaccination monitoring",
      "Create communication channels with community leaders",
      "Develop crisis management protocols respecting local customs",
      "Plan follow-up community gatherings for sharing positive experiences"
    ]
  }
];

const conversationFlow = [
  {
    phase: "Build Trust" as Phase,
    description: "Show respect for cultural beliefs",
    goal: "Create safe space for dialogue"
  },
  {
    phase: "Share Stories" as Phase,
    description: "Use narratives that bridge beliefs",
    goal: "Connect through shared experiences"
  },
  {
    phase: "Bridge Knowledge" as Phase,
    description: "Explain science through cultural lens",
    goal: "Make complex concepts relatable"
  },
  {
    phase: "Empower Choice" as Phase,
    description: "Support informed decision-making",
    goal: "Respect autonomy while guiding"
  },
  {
    phase: "Community Care" as Phase,
    description: "Extend support beyond individual",
    goal: "Build lasting trust"
  }
];

export function TreatmentStrategy({ hesitationPoints }: TreatmentStrategyProps) {
  return (
    <div className="space-y-6">
      {/* 录音分析结果 */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">疫苗犹豫时间节点分析</h2>
        <div className="space-y-4">
          {hesitationPoints.map((point, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg bg-orange-50">
              <div className="flex-shrink-0 w-20 text-sm font-medium text-orange-700">
                {Math.floor(point.time / 60)}:{(point.time % 60).toString().padStart(2, '0')}
              </div>
              <div className="flex-grow">
                <p className="text-sm italic text-orange-700 mb-1">"{point.speech}"</p>
                <p className="text-sm text-orange-900">{point.aiAnalysis}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 后续的对话策略和建议部分 */}
      {/* Treatment Strategy Checklist */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Treatment Strategy Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklist.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg font-medium text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Communication Strategy */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Recommended Communication Approach</h2>
        
        {/* Conversation Logic Flow */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-primary mb-4">Conversation Logic Flow</h3>
          <div className="flex items-center justify-between w-full">
            {conversationFlow.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="w-48">
                  <div className={`${phaseColors[step.phase].bg} ${phaseColors[step.phase].text} p-3 rounded-lg h-full`}>
                    <div className="font-medium">{step.phase}</div>
                    <div className="text-sm mt-1">{step.description}</div>
                    <div className="text-xs mt-1">Goal: {step.goal}</div>
                  </div>
                </div>
                {index < conversationFlow.length - 1 && (
                  <div className="flex-1 flex items-center justify-center px-2">
                    <div className="h-[2px] bg-gray-300 w-full relative">
                      <ArrowRight className="h-5 w-5 text-gray-400 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sample Dialogue */}
        <div>
          <h3 className="text-lg font-medium text-primary mb-4">Sample Dialogue Implementation</h3>
          <div className="space-y-6">
            {sampleDialogue.map((entry, index) => (
              <div key={index} className="space-y-1">
                {entry.speaker === "Doctor" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`${phaseColors[entry.phase].bg} ${phaseColors[entry.phase].text} px-3 py-1 rounded-full text-sm font-medium`}>
                      {entry.isKeyPoint ? '❗ ' : ''}{entry.phase}
                    </div>
                    <div className="h-[1px] flex-grow bg-gray-200"></div>
                  </div>
                )}
                <div className={`flex gap-6 ${
                  entry.speaker === "Doctor" ? "flex-row-reverse" : "flex-row"
                }`}>
                  <div className={`flex-shrink-0 w-20 text-sm font-medium pt-3 ${
                    entry.speaker === "Doctor" ? "text-primary text-left" : "text-green-600 text-right"
                  }`}>
                    {entry.speaker}
                  </div>
                  <div className={`flex-grow p-4 rounded-lg relative ${
                    entry.speaker === "Doctor"
                      ? "bg-blue-50 text-blue-900"
                      : "bg-green-50 text-green-900"
                  }`}>
                    <div className={`absolute top-4 ${
                      entry.speaker === "Doctor" ? "right-[-8px]" : "left-[-8px]"
                    } w-4 h-4 transform ${
                      entry.speaker === "Doctor" ? "rotate-45" : "rotate-45"
                    } ${
                      entry.speaker === "Doctor" ? "bg-blue-50" : "bg-green-50"
                    }`}></div>
                    {entry.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
