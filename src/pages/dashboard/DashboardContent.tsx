import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Plus, Edit, Trash2, ChevronRight, ChevronDown,
  GraduationCap, Layers, FileText, HelpCircle, Save, X, CheckSquare
} from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// ——— Types ———
interface MCQ {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

interface Topic {
  id: string;
  title: string;
  explanation: string;
  keyPoints: { label: string; text: string }[];
  mcqs: MCQ[];
}

interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface ClassItem {
  id: string;
  name: string;
  subjects: Subject[];
}

// ——— ID util ———
const uid = () => Math.random().toString(36).slice(2, 9);

// ——— Initial seed data ———
const initialData: ClassItem[] = [
  {
    id: uid(), name: "ক্লাস ৬",
    subjects: [{
      id: uid(), name: "বিজ্ঞান",
      chapters: [{
        id: uid(), title: "অধ্যায় ১: গতি",
        topics: [{
          id: uid(), title: "ত্বরণ",
          explanation: "একক সময়ে বেগের পরিবর্তনের হারকে ত্বরণ বলে।",
          keyPoints: [{ label: "সূত্র", text: "a = (v - u) / t" }],
          mcqs: [{
            id: uid(), question: "ত্বরণের একক কী?",
            options: ["m/s", "m/s²", "km/h", "N"], correct: 1
          }]
        }]
      }]
    }]
  }
];

// ——— Main Component ———
const DashboardContent = () => {
  const [data, setData] = useState<ClassItem[]>(initialData);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<{
    type: "class" | "subject" | "chapter" | "topic" | "mcq";
    parentPath?: string[];
    editItem?: any;
  } | null>(null);

  const toggle = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  // ——— CRUD helpers ———
  const addClass = (name: string) => {
    setData(p => [...p, { id: uid(), name, subjects: [] }]);
    toast.success("ক্লাস যোগ হয়েছে");
  };

  const addSubject = (classId: string, name: string) => {
    setData(p => p.map(c => c.id === classId
      ? { ...c, subjects: [...c.subjects, { id: uid(), name, chapters: [] }] } : c));
    toast.success("বিষয় যোগ হয়েছে");
  };

  const addChapter = (classId: string, subjectId: string, title: string) => {
    setData(p => p.map(c => c.id === classId ? {
      ...c, subjects: c.subjects.map(s => s.id === subjectId
        ? { ...s, chapters: [...s.chapters, { id: uid(), title, topics: [] }] } : s)
    } : c));
    toast.success("অধ্যায় যোগ হয়েছে");
  };

  const addTopic = (classId: string, subjectId: string, chapterId: string, topic: Omit<Topic, "id">) => {
    setData(p => p.map(c => c.id === classId ? {
      ...c, subjects: c.subjects.map(s => s.id === subjectId ? {
        ...s, chapters: s.chapters.map(ch => ch.id === chapterId
          ? { ...ch, topics: [...ch.topics, { ...topic, id: uid() }] } : ch)
      } : s)
    } : c));
    toast.success("টপিক যোগ হয়েছে");
  };

  const addMCQ = (classId: string, subjectId: string, chapterId: string, topicId: string, mcq: Omit<MCQ, "id">) => {
    setData(p => p.map(c => c.id === classId ? {
      ...c, subjects: c.subjects.map(s => s.id === subjectId ? {
        ...s, chapters: s.chapters.map(ch => ch.id === chapterId ? {
          ...ch, topics: ch.topics.map(t => t.id === topicId
            ? { ...t, mcqs: [...t.mcqs, { ...mcq, id: uid() }] } : t)
        } : ch)
      } : s)
    } : c));
    toast.success("MCQ যোগ হয়েছে");
  };

  const deleteItem = (type: string, ...path: string[]) => {
    setData(prev => {
      if (type === "class") return prev.filter(c => c.id !== path[0]);
      return prev.map(c => {
        if (c.id !== path[0]) return c;
        if (type === "subject") return { ...c, subjects: c.subjects.filter(s => s.id !== path[1]) };
        return {
          ...c, subjects: c.subjects.map(s => {
            if (s.id !== path[1]) return s;
            if (type === "chapter") return { ...s, chapters: s.chapters.filter(ch => ch.id !== path[2]) };
            return {
              ...s, chapters: s.chapters.map(ch => {
                if (ch.id !== path[2]) return ch;
                if (type === "topic") return { ...ch, topics: ch.topics.filter(t => t.id !== path[3]) };
                return {
                  ...ch, topics: ch.topics.map(t => {
                    if (t.id !== path[3]) return t;
                    return { ...t, mcqs: t.mcqs.filter(m => m.id !== path[4]) };
                  })
                };
              })
            };
          })
        };
      });
    });
    toast.success("মুছে ফেলা হয়েছে");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">কন্টেন্ট ম্যানেজমেন্ট</h1>
          <p className="text-sm text-muted-foreground mt-0.5">ক্লাস, বিষয়, অধ্যায়, টপিক ও প্রশ্ন পরিচালনা</p>
        </div>
        <Button
          onClick={() => setModal({ type: "class" })}
          className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={16} />
          নতুন ক্লাস
        </Button>
      </div>

      {/* Tree View */}
      <div className="space-y-3">
        {data.map(cls => (
          <TreeClass
            key={cls.id}
            cls={cls}
            expanded={expanded}
            toggle={toggle}
            onAdd={(type, path) => setModal({ type, parentPath: path })}
            onDelete={deleteItem}
          />
        ))}
        {data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/50 bg-card p-12 text-center">
            <GraduationCap size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">কোনো ক্লাস নেই। উপরের বাটনে ক্লিক করে শুরু করুন।</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ContentModal
        modal={modal}
        onClose={() => setModal(null)}
        onAddClass={addClass}
        onAddSubject={addSubject}
        onAddChapter={addChapter}
        onAddTopic={addTopic}
        onAddMCQ={addMCQ}
      />
    </div>
  );
};

// ——— Tree Row Component ———
const TreeRow = ({
  icon: Icon, label, count, countLabel, depth, id, expanded, toggle, onDelete, children, addButtons
}: {
  icon: any; label: string; count?: number; countLabel?: string;
  depth: number; id: string; expanded: Record<string, boolean>;
  toggle: (id: string) => void; onDelete?: () => void;
  children?: React.ReactNode; addButtons?: React.ReactNode;
}) => {
  const isOpen = expanded[id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={depth === 0 ? "rounded-2xl border border-border/50 bg-card overflow-hidden" : ""}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent/30 transition-colors ${
          depth > 0 ? "border-t border-border/30" : ""
        }`}
        style={{ paddingLeft: `${16 + depth * 20}px` }}
        onClick={() => toggle(id)}
      >
        <button className="p-0.5 text-muted-foreground">
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
          <Icon size={15} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{label}</p>
          {count !== undefined && (
            <p className="text-[11px] text-muted-foreground">{count} {countLabel}</p>
          )}
        </div>
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          {addButtons}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ——— Tree: Class ———
const TreeClass = ({ cls, expanded, toggle, onAdd, onDelete }: {
  cls: ClassItem; expanded: Record<string, boolean>;
  toggle: (id: string) => void;
  onAdd: (type: any, path: string[]) => void;
  onDelete: (type: string, ...path: string[]) => void;
}) => (
  <TreeRow
    icon={GraduationCap} label={cls.name}
    count={cls.subjects.length} countLabel="টি বিষয়"
    depth={0} id={cls.id} expanded={expanded} toggle={toggle}
    onDelete={() => onDelete("class", cls.id)}
    addButtons={
      <button
        onClick={() => onAdd("subject", [cls.id])}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        <Plus size={12} /> বিষয়
      </button>
    }
  >
    {cls.subjects.map(sub => (
      <TreeRow
        key={sub.id} icon={BookOpen} label={sub.name}
        count={sub.chapters.length} countLabel="টি অধ্যায়"
        depth={1} id={sub.id} expanded={expanded} toggle={toggle}
        onDelete={() => onDelete("subject", cls.id, sub.id)}
        addButtons={
          <button
            onClick={() => onAdd("chapter", [cls.id, sub.id])}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Plus size={12} /> অধ্যায়
          </button>
        }
      >
        {sub.chapters.map(ch => (
          <TreeRow
            key={ch.id} icon={Layers} label={ch.title}
            count={ch.topics.length} countLabel="টি টপিক"
            depth={2} id={ch.id} expanded={expanded} toggle={toggle}
            onDelete={() => onDelete("chapter", cls.id, sub.id, ch.id)}
            addButtons={
              <button
                onClick={() => onAdd("topic", [cls.id, sub.id, ch.id])}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus size={12} /> টপিক
              </button>
            }
          >
            {ch.topics.map(topic => (
              <TreeRow
                key={topic.id} icon={FileText} label={topic.title}
                count={topic.mcqs.length} countLabel="টি MCQ"
                depth={3} id={topic.id} expanded={expanded} toggle={toggle}
                onDelete={() => onDelete("topic", cls.id, sub.id, ch.id, topic.id)}
                addButtons={
                  <button
                    onClick={() => onAdd("mcq", [cls.id, sub.id, ch.id, topic.id])}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Plus size={12} /> MCQ
                  </button>
                }
              >
                {/* Topic detail inline */}
                <div className="px-6 py-3 space-y-3" style={{ paddingLeft: "96px" }}>
                  <div className="rounded-xl bg-accent/40 p-3 border border-border/30">
                    <p className="text-[11px] font-semibold text-primary mb-1">ব্যাখ্যা</p>
                    <p className="text-xs text-foreground/80 leading-relaxed">{topic.explanation || "কোনো ব্যাখ্যা নেই"}</p>
                  </div>
                  {topic.keyPoints.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold text-muted-foreground">মূল পয়েন্ট</p>
                      {topic.keyPoints.map((kp, i) => (
                        <div key={i} className="rounded-lg bg-muted/50 px-3 py-2 border border-border/20">
                          <span className="text-[10px] font-bold text-primary">{kp.label}: </span>
                          <span className="text-xs text-foreground/80">{kp.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {topic.mcqs.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-muted-foreground">MCQ প্রশ্নসমূহ</p>
                      {topic.mcqs.map((mcq, qi) => (
                        <div key={mcq.id} className="rounded-xl bg-muted/40 p-3 border border-border/20 relative group">
                          <button
                            onClick={() => onDelete("mcq", cls.id, sub.id, ch.id, topic.id, mcq.id)}
                            className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                          <p className="text-xs font-medium text-foreground mb-2">{qi + 1}. {mcq.question}</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {mcq.options.map((opt, oi) => (
                              <div
                                key={oi}
                                className={`rounded-lg px-2.5 py-1.5 text-[11px] border ${
                                  oi === mcq.correct
                                    ? "border-success/50 bg-success/10 text-success font-medium"
                                    : "border-border/30 bg-card text-foreground/70"
                                }`}
                              >
                                {String.fromCharCode(2453 + oi)}. {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TreeRow>
            ))}
          </TreeRow>
        ))}
      </TreeRow>
    ))}
  </TreeRow>
);

// ——— Modals ———
const ContentModal = ({
  modal, onClose, onAddClass, onAddSubject, onAddChapter, onAddTopic, onAddMCQ
}: {
  modal: { type: string; parentPath?: string[] } | null;
  onClose: () => void;
  onAddClass: (name: string) => void;
  onAddSubject: (classId: string, name: string) => void;
  onAddChapter: (classId: string, subjectId: string, title: string) => void;
  onAddTopic: (classId: string, subjectId: string, chapterId: string, topic: Omit<Topic, "id">) => void;
  onAddMCQ: (classId: string, subjectId: string, chapterId: string, topicId: string, mcq: Omit<MCQ, "id">) => void;
}) => {
  if (!modal) return null;

  const titles: Record<string, string> = {
    class: "নতুন ক্লাস", subject: "নতুন বিষয়", chapter: "নতুন অধ্যায়",
    topic: "নতুন টপিক", mcq: "নতুন MCQ প্রশ্ন"
  };

  return (
    <Dialog open={!!modal} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card border-border/50 sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">{titles[modal.type]}</DialogTitle>
        </DialogHeader>
        {modal.type === "class" && <SimpleForm label="ক্লাসের নাম" placeholder="যেমন: ক্লাস ৭" onSubmit={v => { onAddClass(v); onClose(); }} />}
        {modal.type === "subject" && <SimpleForm label="বিষয়ের নাম" placeholder="যেমন: গণিত" onSubmit={v => { onAddSubject(modal.parentPath![0], v); onClose(); }} />}
        {modal.type === "chapter" && <SimpleForm label="অধ্যায়ের নাম" placeholder="যেমন: অধ্যায় ১: গতি" onSubmit={v => { onAddChapter(modal.parentPath![0], modal.parentPath![1], v); onClose(); }} />}
        {modal.type === "topic" && <TopicForm onSubmit={topic => { onAddTopic(modal.parentPath![0], modal.parentPath![1], modal.parentPath![2], topic); onClose(); }} />}
        {modal.type === "mcq" && <MCQForm onSubmit={mcq => { onAddMCQ(modal.parentPath![0], modal.parentPath![1], modal.parentPath![2], modal.parentPath![3], mcq); onClose(); }} />}
      </DialogContent>
    </Dialog>
  );
};

// ——— Simple name form ———
const SimpleForm = ({ label, placeholder, onSubmit }: { label: string; placeholder: string; onSubmit: (v: string) => void }) => {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-4 pt-2">
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{label}</label>
        <input
          value={value} onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-border/50 bg-muted/30 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          autoFocus
        />
      </div>
      <Button onClick={() => value.trim() && onSubmit(value.trim())} disabled={!value.trim()} className="w-full rounded-xl gap-2">
        <Save size={14} /> সংরক্ষণ করুন
      </Button>
    </div>
  );
};

// ——— Topic form ———
const TopicForm = ({ onSubmit }: { onSubmit: (t: Omit<Topic, "id">) => void }) => {
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [keyPoints, setKeyPoints] = useState<{ label: string; text: string }[]>([{ label: "", text: "" }]);

  const addKP = () => setKeyPoints(p => [...p, { label: "", text: "" }]);
  const updateKP = (i: number, field: "label" | "text", val: string) =>
    setKeyPoints(p => p.map((kp, idx) => idx === i ? { ...kp, [field]: val } : kp));
  const removeKP = (i: number) => setKeyPoints(p => p.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      explanation: explanation.trim(),
      keyPoints: keyPoints.filter(kp => kp.label.trim() && kp.text.trim()),
      mcqs: []
    });
  };

  return (
    <div className="space-y-4 pt-2">
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">টপিকের নাম</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="যেমন: ত্বরণ"
          className="w-full rounded-xl border border-border/50 bg-muted/30 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" autoFocus />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">ব্যাখ্যা</label>
        <textarea value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="টপিকের বিস্তারিত ব্যাখ্যা লিখুন..." rows={4}
          className="w-full rounded-xl border border-border/50 bg-muted/30 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-muted-foreground">মূল পয়েন্ট</label>
          <button onClick={addKP} className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80">
            <Plus size={12} /> যোগ করুন
          </button>
        </div>
        <div className="space-y-2">
          {keyPoints.map((kp, i) => (
            <div key={i} className="flex gap-2 items-start">
              <input value={kp.label} onChange={e => updateKP(i, "label", e.target.value)} placeholder="লেবেল"
                className="w-24 shrink-0 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-all" />
              <input value={kp.text} onChange={e => updateKP(i, "text", e.target.value)} placeholder="বিবরণ"
                className="flex-1 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-all" />
              {keyPoints.length > 1 && (
                <button onClick={() => removeKP(i)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={!title.trim()} className="w-full rounded-xl gap-2">
        <Save size={14} /> টপিক সংরক্ষণ করুন
      </Button>
    </div>
  );
};

// ——— MCQ form ———
const MCQForm = ({ onSubmit }: { onSubmit: (m: Omit<MCQ, "id">) => void }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);

  const updateOption = (i: number, val: string) =>
    setOptions(p => p.map((o, idx) => idx === i ? val : o));

  const handleSubmit = () => {
    if (!question.trim() || options.some(o => !o.trim())) return;
    onSubmit({ question: question.trim(), options: options.map(o => o.trim()), correct });
  };

  const valid = question.trim() && options.every(o => o.trim());

  return (
    <div className="space-y-4 pt-2">
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">প্রশ্ন</label>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="MCQ প্রশ্ন লিখুন..." rows={2}
          className="w-full rounded-xl border border-border/50 bg-muted/30 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" autoFocus />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-2 block">অপশন (সঠিক উত্তর সিলেক্ট করুন)</label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => setCorrect(i)}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  correct === i
                    ? "border-success bg-success/20 text-success"
                    : "border-border/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                {String.fromCharCode(2453 + i)}
              </button>
              <input value={opt} onChange={e => updateOption(i, e.target.value)} placeholder={`অপশন ${i + 1}`}
                className="flex-1 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-all" />
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={!valid} className="w-full rounded-xl gap-2">
        <CheckSquare size={14} /> MCQ যোগ করুন
      </Button>
    </div>
  );
};

export default DashboardContent;
