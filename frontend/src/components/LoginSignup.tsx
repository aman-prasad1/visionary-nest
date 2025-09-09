import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateForm } from '../lib/validations';
import { useNavigate } from 'react-router-dom';


// --- Reusable Floating Shape Component for Left Panel ---
const FloatingShape: React.FC<{ style: React.CSSProperties, animate: any, transition: any }> = ({ style, animate, transition }) => (
    <motion.div
        style={style}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ ...animate, scale: 1, opacity: 1 }}
        transition={transition}
    />
);

// --- New Animated Background for Right Panel ---
const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const particleCount = 50;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.random() * 0.5 - 0.25,
                    vy: Math.random() * 0.5 - 0.25,
                    radius: Math.random() * 2 + 1,
                });
            }
        };

        resizeCanvas();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(129, 140, 248, 0.7)';
                ctx.fill();
            });

            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 120) {
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                    }
                }
            }
            ctx.strokeStyle = 'rgba(129, 140, 248, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
        
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} style={styles.animatedBg} />;
};


// --- Main Component ---
const SkillForgeAuth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullname: '',
        username: '',
        avatar: null as File | null,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, avatar: file }));

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(null);
        }

        if (errors.avatar) {
            setErrors(prev => ({ ...prev, avatar: '' }));
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const validationRules: Record<string, (value: any, allData?: any) => string> = {};

        if (isSignUp) {
            validationRules.fullname = (value: string) => {
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 3) return 'Full name must be at least 3 characters';
                if (value.trim().length > 50) return 'Full name must be no more than 50 characters';
                return '';
            };
            validationRules.username = (value: string) => {
                if (!value.trim()) return 'Username is required';
                if (value.trim().length < 3) return 'Username must be at least 3 characters';
                if (value.trim().length > 30) return 'Username must be no more than 30 characters';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
                return '';
            };
            validationRules.email = (value: string) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            };
            validationRules.password = (value: string) => {
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters';
                return '';
            };
            validationRules.confirmPassword = (value: string, allData: any) => {
                if (!value) return 'Please confirm your password';
                if (value !== allData.password) return 'Passwords do not match';
                return '';
            };
            validationRules.avatar = (value: File | null) => {
                if (!value) return 'Avatar is required';
                if (value.size > 5 * 1024 * 1024) return 'Avatar must be less than 5MB';
                if (!value.type.startsWith('image/')) return 'Avatar must be an image file';
                return '';
            };
        } else {
            validationRules.email = (value: string) => {
                if (!value.trim()) return 'Email or username is required';
                return '';
            };
            validationRules.password = (value: string) => {
                if (!value) return 'Password is required';
                return '';
            };
        }

        const formErrors = validateForm(formData, validationRules);
        setErrors(formErrors);

        if (Object.values(formErrors).some(error => error)) {
            return;
        }

        setIsSubmitting(true);
        try {
            if (isSignUp) {
                const result = await register({
                    fullname: formData.fullname,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    avatar: formData.avatar!,
                });

                if (result.success) {
                    navigate('/login', {
                        state: { message: result.message }
                    });
                } else {
                    setErrors({ general: result.message || 'Registration failed' });
                }
            } else {
                const result = await login(formData.email, formData.password);

                if (result.success) {
                    navigate('/', { replace: true });
                } else {
                    setErrors({ general: result.message || 'Login failed' });
                }
            }
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const formContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    const formItemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }, // easeOut
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } }, // easeIn
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins:wght@400;500;600&display=swap');
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.leftPanel}>
                        <FloatingShape 
                            style={{...styles.shape, width: 200, height: 200, top: '-5%', left: '-10%', background: 'linear-gradient(45deg, #f59e0b, #f97316)'}}
                            animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                            transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0 }}
                        />
                         <FloatingShape 
                            style={{...styles.shape, width: 150, height: 150, top: '15%', right: '-5%', background: 'linear-gradient(45deg, #14b8a6, #059669)'}}
                            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
                            transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
                        />
                        <FloatingShape 
                            style={{...styles.shape, width: 80, height: 80, bottom: '10%', left: '20%', background: 'linear-gradient(45deg, #6366f1, #818cf8)'}}
                            animate={{ y: [0, 15, 0], x: [0, 15, 0] }}
                            transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
                        />
                        <div style={styles.glassCard}>
                            <h2 style={styles.brandTitle}>VISIONARYNEST</h2>
                            <h1 style={styles.mainHeading}>Showcase Your Skills. Build Your Future.</h1>
                            <p style={styles.description}>Join thousands of students connecting with top-tier recruiters. We invite you to forge your path to success.</p>
                            <div style={styles.toggleContainer}>
                                <p style={styles.toggleText}>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
                                <motion.button onClick={() => setIsSignUp(!isSignUp)} style={styles.toggleButton} whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.95 }}>
                                    {isSignUp ? 'Sign In' : 'Sign Up'}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <div style={styles.rightPanel}>
                        <AnimatedBackground />
                        <AnimatePresence mode="wait">
                            <motion.div key={isSignUp ? 'signup' : 'signin'} variants={formContainerVariants} initial="hidden" animate="visible" exit="exit" style={styles.formWrapper}>
                                <form onSubmit={handleFormSubmit} style={styles.form}>
                                    {errors.general && (
                                        <motion.div variants={formItemVariants} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '20px' }}>
                                            <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{errors.general}</p>
                                        </motion.div>
                                    )}
                                    <motion.h2 variants={formItemVariants} style={styles.formTitle}>{isSignUp ? 'Create Your Account' : 'Welcome Back'}</motion.h2>
                                    <motion.div variants={formItemVariants} style={styles.inputGroup}>
                                        <label htmlFor="email" style={styles.label}>{isSignUp ? 'Email address' : 'Email or Username'}</label>
                                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} placeholder={isSignUp ? "you@example.com" : "Enter your email or username"} required />
                                        {errors.email && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.email}</p>}
                                    </motion.div>
                                    <motion.div variants={formItemVariants} style={styles.inputGroup}>
                                        <label htmlFor="password" style={styles.label}>Password</label>
                                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} placeholder="Enter your password" required />
                                        {errors.password && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.password}</p>}
                                    </motion.div>
                                    <motion.div variants={formItemVariants} style={styles.showPasswordContainer}>
                                        <input type="checkbox" id="show-password" checked={showPassword} onChange={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}/>
                                        <label htmlFor="show-password" style={styles.showPasswordLabel}>Show password</label>
                                    </motion.div>

                                    {isSignUp && (
                                        <>
                                            <motion.div variants={formItemVariants} style={styles.inputGroup}>
                                                <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
                                                <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={styles.input} placeholder="Confirm your password" required />
                                                {errors.confirmPassword && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.confirmPassword}</p>}
                                            </motion.div>
                                            <motion.div variants={formItemVariants} style={styles.showPasswordContainer}>
                                                <input type="checkbox" id="show-confirm-password" checked={showConfirmPassword} onChange={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}/>
                                                <label htmlFor="show-confirm-password" style={styles.showPasswordLabel}>Show confirm password</label>
                                            </motion.div>

                                            <motion.div variants={formItemVariants} style={styles.inputGroup}>
                                                <label htmlFor="fullname" style={styles.label}>Full Name</label>
                                                <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} style={styles.input} placeholder="Enter your full name" required />
                                                {errors.fullname && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.fullname}</p>}
                                            </motion.div>

                                            <motion.div variants={formItemVariants} style={styles.inputGroup}>
                                                <label htmlFor="username" style={styles.label}>Username</label>
                                                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} style={styles.input} placeholder="Choose a username" required />
                                                {errors.username && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.username}</p>}
                                            </motion.div>

                                            <motion.div variants={formItemVariants} style={styles.inputGroup}>
                                                <label htmlFor="avatar" style={styles.label}>Profile Picture</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ position: 'relative' }}>
                                                        <input
                                                            type="file"
                                                            id="avatar"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            style={{ display: 'none' }}
                                                            required
                                                        />
                                                        <label
                                                            htmlFor="avatar"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                width: '60px',
                                                                height: '60px',
                                                                background: 'rgba(255, 255, 255, 0.1)',
                                                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                                                borderRadius: '50%',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s ease',
                                                            }}
                                                        >
                                                            {avatarPreview ? (
                                                                <img
                                                                    src={avatarPreview}
                                                                    alt="Avatar preview"
                                                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <span style={{ color: '#d1d5db', fontSize: '24px' }}>📷</span>
                                                            )}
                                                        </label>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ color: '#d1d5db', fontSize: '0.9rem', margin: 0 }}>
                                                            {formData.avatar ? formData.avatar.name : 'Choose a profile picture'}
                                                        </p>
                                                        <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: '4px 0 0 0' }}>Max 5MB, JPG/PNG</p>
                                                    </div>
                                                </div>
                                                {errors.avatar && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>{errors.avatar}</p>}
                                            </motion.div>
                                        </>
                                    )}
                                    <motion.div variants={formItemVariants}>
                                        <motion.button
                                            whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(92, 72, 233, 0.4)' }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            style={styles.submitButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid rgba(255, 255, 255, 0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px' }}></div>
                                                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                                                </>
                                            ) : (
                                                <>{isSignUp ? 'Sign Up →' : 'Sign In →'}</>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    page: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f0f4f8',
        fontFamily: "'Poppins', sans-serif",
    },
    container: {
        display: 'flex',
        width: '1000px',
        maxWidth: '95%',
        minHeight: '650px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        flexWrap: 'wrap', // FIX: Allows panels to stack on smaller screens
    },
    leftPanel: {
        flex: '1 1 420px', // FIX: Allows shrinking and growing
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    rightPanel: {
        flex: '1 1 420px', // FIX: Allows shrinking and growing
        padding: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#111827',
        boxSizing: 'border-box',
    },
    animatedBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    formWrapper: {
        width: '100%',
        zIndex: 1,
        position: 'relative',
    },
    glassCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        padding: '35px',
        borderRadius: '20px',
        zIndex: 2,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
    },
    brandTitle: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#a7b2ff',
        marginBottom: '10px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    mainHeading: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '2.8rem',
        fontWeight: 700,
        lineHeight: 1.25,
        marginBottom: '20px',
    },
    description: {
        fontSize: '1rem',
        lineHeight: 1.7,
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: '30px',
    },
    toggleContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    toggleText: {
        margin: 0,
        color: 'rgba(255, 255, 255, 0.85)',
    },
    toggleButton: {
        background: 'none',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        color: 'white',
        padding: '8px 18px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'all 0.3s ease',
    },
    form: {
        width: '100%',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
    },
    formTitle: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '2.4rem',
        color: '#e5e7eb',
        marginBottom: '35px',
        fontWeight: 700,
    },
    inputGroup: {
        marginBottom: '22px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#d1d5db',
        fontWeight: 500,
        fontSize: '0.9rem',
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        borderRadius: '10px',
        border: '1px solid #4b5563',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxSizing: 'border-box',
        background: '#1f2937',
        color: '#f3f4f6',
    },
    showPasswordContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '28px',
        gap: '8px',
    },
    showPasswordLabel: {
        fontSize: '0.9rem',
        color: '#d1d5db',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '16px',
        border: 'none',
        borderRadius: '10px',
        background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(92, 72, 233, 0.3)',
        transition: 'all 0.3s ease',
    },
    shape: {
        position: 'absolute',
        borderRadius: '50%',
        zIndex: 1,
    },
};

export default SkillForgeAuth;
