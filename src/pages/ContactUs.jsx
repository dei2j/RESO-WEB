import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BUDGET_OPTIONS = [
  'Below $5,000',
  '$5,000–$10,000',
  '$10,000–$20,000',
  '$20,000–$30,000',
  'Above $30,000',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const UnderlineInput = ({ label, name, value, onChange, type = 'text', ...rest }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== '';

  return (
    <div className="relative pt-6 pb-2 border-b border-gray-300 transition-colors duration-300 hover:border-gray-500 focus-within:border-[#1907b7]">
      <label
        className={`absolute left-0 font-kulim font-light text-gray-400 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? 'top-0 text-xs md:text-sm -translate-y-0.5 text-[#1907b7]'
            : 'top-6 text-lg md:text-xl'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-2 pb-1 font-kulim font-light text-[#050505] text-lg md:text-xl bg-transparent focus:outline-none placeholder:text-gray-300"
        {...rest}
      />
    </div>
  );
};

const UnderlineTextarea = ({ label, name, value, onChange, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== '';

  return (
    <div className="relative pt-6 pb-2 border-b border-gray-300 transition-colors duration-300 hover:border-gray-500 focus-within:border-[#1907b7]">
      <label
        className={`absolute left-0 font-kulim font-light text-gray-400 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? 'top-0 text-xs md:text-sm -translate-y-0.5 text-[#1907b7]'
            : 'top-6 text-lg md:text-xl'
        }`}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full min-h-[160px] md:min-h-[200px] pt-2 pb-1 font-kulim font-light text-[#050505] text-lg md:text-xl bg-transparent focus:outline-none placeholder:text-gray-300 resize-none"
        {...rest}
      />
    </div>
  );
};

const listVariants = {
  closed: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
};

const BudgetDropdown = ({ label, value, options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const hasValue = value !== '';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`relative pt-6 pb-2 border-b border-gray-300 transition-colors duration-300 hover:border-gray-500 ${open ? 'border-[#1907b7]' : ''}`}
      >
        <span
          className={`absolute left-0 font-kulim font-light text-gray-400 transition-all duration-300 pointer-events-none ${
            hasValue || open ? 'top-0 text-xs md:text-sm -translate-y-0.5 text-[#1907b7]' : 'top-6 text-lg md:text-xl'
          }`}
        >
          {label}
        </span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-3 pt-2 pb-1 text-left font-kulim font-light text-lg md:text-xl text-[#050505] bg-transparent focus:outline-none cursor-pointer min-h-[1.75rem]"
        >
          <span className={!value ? 'text-gray-400' : ''}>
            {value || ''}
          </span>
          <motion.span
            className="inline-flex shrink-0 text-[#1907b7]"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className="absolute left-0 right-0 top-full mt-0.5 bg-white border border-gray-200 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden z-50 py-1 max-h-[240px] overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={listVariants}
          >
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2.5 font-kulim font-light text-lg md:text-xl text-[#050505] cursor-pointer transition-colors duration-150 hover:bg-[#f5f7ff] hover:text-[#1907b7] ${value === opt ? 'bg-[#f5f7ff] text-[#1907b7]' : ''}`}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactUs = () => {
  const rightRef = useRef(null);
  const fileInputRef = useRef(null);
  const iframeRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    brief: '',
    budget: '',
  });
  // 파일은 별도 state로 관리 (DataTransfer로 file input에 동기화)
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // files state가 바뀔 때마다 실제 file input에 동기화
  useEffect(() => {
    if (!fileInputRef.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    fileInputRef.current.files = dt.files;
  }, [files]);

  // hidden iframe 로드 완료 시 전송 성공 처리
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleLoad = () => {
      if (!isSubmitting) return;
      setIsSubmitting(false);
      alert('Your inquiry has been sent successfully.');
      setForm({ name: '', email: '', mobile: '', brief: '', budget: '' });
      setFiles([]);
    };
    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;

    const merged = [...files, ...newFiles];
    const totalSize = merged.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > 10 * 1024 * 1024) {
      alert('Total file size must be 10MB or less.');
      return;
    }

    setFiles(merged);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 네이티브 form 제출을 허용 (e.preventDefault 안 함)
  const handleSubmit = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim() || !form.brief.trim() || !form.budget) {
      e.preventDefault();
      alert('Please fill in all required fields (Name, Email, Mobile Number, Brief, Budget Range).');
      return;
    }
    // 검증 통과 → 네이티브 form submit 진행 (hidden iframe으로)
    setIsSubmitting(true);
  };

  const rightColumnVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };
  const rightItemVariants = {
    hidden: { y: 28, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="bg-white min-h-screen text-[#050505]">
      {/* 네이티브 form 응답을 받을 hidden iframe */}
      <iframe ref={iframeRef} name="hidden_iframe" className="hidden" title="form-target" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-44 lg:pt-52 pb-32 md:pb-40">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-20 xl:gap-24 items-stretch min-h-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 좌측 폼 */}
          <div className="min-w-0 py-2 flex flex-col">
            <motion.h1
              className="font-kulim font-bold text-[#1907b7] text-4xl md:text-[60px] xl:text-[80px] leading-[0.95] mb-20 md:mb-28"
              variants={itemVariants}
            >
              Contact us
            </motion.h1>

            <form
              action="https://formsubmit.co/junh9126@gmail.com"
              method="POST"
              encType="multipart/form-data"
              target="hidden_iframe"
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8"
            >
              {/* FormSubmit hidden 설정 */}
              <input type="hidden" name="_subject" value={`New Contact Inquiry - ${form.name}`} />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_template" value="table" />

              <motion.div variants={itemVariants} className="mb-1">
                <UnderlineInput
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-1">
                <UnderlineInput
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-1">
                <UnderlineInput
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-1">
                <UnderlineTextarea
                  label="Brief"
                  name="brief"
                  value={form.brief}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mt-4 mb-4">
                <div className="relative pt-6 pb-4 border-b border-gray-300 transition-colors duration-300 hover:border-gray-500 group">
                  <span
                    className={`absolute left-0 font-kulim font-light text-gray-400 transition-all duration-300 pointer-events-none ${
                      files.length
                        ? 'top-0 text-xs md:text-sm -translate-y-0.5 text-[#1907b7]'
                        : 'top-6 text-lg md:text-xl'
                    }`}
                  >
                    File
                  </span>
                  <div className="pt-4 pb-1 min-h-[1.75rem]">
                    {files.length > 0 ? (
                      <ul className="space-y-2">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${file.size}-${index}`}
                            className="flex items-center justify-between gap-2 font-kulim font-light text-lg md:text-xl text-[#050505]"
                          >
                            <span className="truncate min-w-0">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#1907b7] transition-colors"
                              aria-label={`Remove ${file.name}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <p className="font-kulim font-light text-xs md:text-sm text-gray-400">
                        Max total upload size: 10MB
                      </p>
                      <label className="flex items-center justify-end cursor-pointer">
                        <span className="font-kulim font-light text-[#9dc2d6] text-lg md:text-xl">
                          Add file
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="attachment"
                          multiple
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip,.hwp,.hwpx,.xls,.xlsx"
                          className="absolute w-0 h-0 opacity-0 overflow-hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="mb-1">
                {/* budget은 커스텀 드롭다운이므로 hidden input 필요 */}
                <input type="hidden" name="budget" value={form.budget} />
                <BudgetDropdown
                  label="Budget Range"
                  value={form.budget}
                  options={BUDGET_OPTIONS}
                  onSelect={(value) => setForm((prev) => ({ ...prev, budget: value }))}
                />
              </motion.div>

              <motion.div className="pt-10 mt-8 md:pt-12 md:mt-10" variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative h-14 md:h-16 w-full md:w-[280px] font-kulim font-bold text-xl md:text-2xl border-2 border-[#1907b7] overflow-hidden flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? 'hover' : 'rest'}
                  initial="rest"
                  variants={{
                    rest: {},
                    hover: {},
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-[#1907b7] origin-left z-0"
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span
                    className="relative z-10 text-[#1907b7]"
                    variants={{
                      rest: { color: 'rgb(25, 7, 183)' },
                      hover: { color: 'rgb(255, 255, 255)' },
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Forward'}
                  </motion.span>
                  <motion.span
                    className="relative z-10 text-2xl md:text-3xl font-light"
                    variants={{
                      rest: { x: 0, color: 'rgb(25, 7, 183)' },
                      hover: { x: 8, color: 'rgb(255, 255, 255)' },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            </form>
          </div>

          {/* 우측 비주얼 */}
          <motion.div
            ref={rightRef}
            className="w-full flex flex-col min-h-0 h-full lg:pl-4 pt-[7.5rem] md:pt-[11rem] lg:pt-[12.25rem] xl:pt-[12.5rem]"
            variants={rightColumnVariants}
          >
            <motion.p
              className="font-kulim font-light text-[#050505] text-2xl md:text-3xl xl:text-4xl 2xl:text-[42px] leading-tight mb-6"
              variants={rightItemVariants}
            >
              We&apos;d love to{' '}
              <span className="text-[#EF283F] italic font-bold">collaborate</span>
              <br />
              with you.
            </motion.p>
            <div className="relative z-10 flex gap-0.5 -mb-1">
              <motion.div
                className="w-4 h-4 rounded-full bg-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="w-4 h-4 rounded-full bg-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
            </div>
            <motion.div
              className="w-full flex flex-col justify-end flex-1"
              variants={rightItemVariants}
            >
              <img
                src="/img/contact_us.png"
                alt="Contact Us"
                className="w-full h-auto object-contain mb-[6.5rem] md:mb-[7.5rem]"
              />
              <div className="flex justify-end mb-8">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1, delay: 0.5 }}
                >
                  <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                    <path d="M0 12H88M88 12L80 5M88 12L80 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactUs;
