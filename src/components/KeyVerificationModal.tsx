import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Key, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { verifyKey } from "../data/keys";

interface KeyVerificationModalProps {
  isOpen: boolean;
  testId: string;
  testTitle: string;
  onClose: () => void;
  onVerified: () => void;
}

export function KeyVerificationModal({ 
  isOpen, 
  testId, 
  testTitle, 
  onClose, 
  onVerified 
}: KeyVerificationModalProps) {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    setIsLoading(true);
    setError(null);

    // Simulate network delay for better UX
    setTimeout(() => {
      // Normalize the key before verification
      const normalizedKey = key.trim();
      const isValid = verifyKey(testId, normalizedKey);

      if (isValid) {
        setSuccess(true);
        setTimeout(() => {
          onVerified();
          setKey("");
          setSuccess(false);
        }, 1500);
      } else {
        console.log(`Verification failed for testId: ${testId}, key: ${normalizedKey}`);
        setError("无效的密钥 (Invalid key)");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border border-white/20"
            >
              <div className="relative p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-sm">
                    {success ? <CheckCircle2 size={32} /> : <Key size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {success ? "验证成功！" : "请输入测试密钥"}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {success 
                      ? "正在进入测试..." 
                      : `本测试 "${testTitle}" 需要密钥才能访问。请输入您购买的密钥。`}
                  </p>
                </div>

                {!success && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => {
                            setKey(e.target.value);
                            setError(null);
                          }}
                          placeholder="请输入密钥"
                          className={`w-full px-5 py-4 bg-neutral-50 border-2 rounded-xl outline-none transition-all font-mono text-center text-lg tracking-wider ${
                            error 
                              ? "border-red-300 focus:border-red-500 text-red-900 placeholder-red-300" 
                              : "border-neutral-200 focus:border-pink-500 focus:bg-white text-neutral-900 placeholder-neutral-400"
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium"
                        >
                          <AlertCircle size={14} />
                          {error}
                        </motion.div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !key.trim()}
                      className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          验证中...
                        </>
                      ) : (
                        "开始测试"
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              <div className="bg-neutral-50 px-8 py-4 text-center border-t border-neutral-100">
                <p className="text-xs text-neutral-400">
                  还没有密钥？小红书搜索“KBubble测评”获取。
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
