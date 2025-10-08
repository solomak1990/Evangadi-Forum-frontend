import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import axios from '../../axiosConfig';

function Home() {
    const { user } = useContext(AppState);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            setError('');
            const { data } = await axios.get('/questions');
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setError('Failed to load questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAskQuestion = () => {
        navigate('/ask');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleQuestionClick = (questionId) => {
        navigate(`/answers/${questionId}`);
    };

    const handleRefresh = () => {
        fetchQuestions();
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner}></div>
                Loading questions...
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header - Full width */}
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.headerLeft}>
                        <div style={styles.logoContainer}>
                            <span style={styles.logoText}>EVANGADI</span>
                        </div>
                    </div>
                    
                    <div style={styles.headerRight}>
                        <span style={styles.navItem}>How it works</span>
                        <button 
                            onClick={handleLogout}
                            style={styles.logoutButton}
                        >
                            LOG OUT
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Full width with proper padding */}
            <main style={styles.main}>
                {/* Top Section */}
                <div style={styles.topSection}>
                    <button 
                        onClick={handleAskQuestion}
                        style={styles.askButton}
                    >
                        Ask Question
                    </button>
                    
                    <span style={styles.welcomeText}>
                        Welcome: <span style={styles.username}>{user?.username || 'Guest'}</span>
                    </span>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={styles.errorContainer}>
                        <span style={styles.errorText}>{error}</span>
                        <button 
                            onClick={handleRefresh}
                            style={styles.retryButton}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Questions List */}
                <div style={styles.questionsContainer}>
                    {questions.length === 0 ? (
                        <div style={styles.noQuestions}>
                            <p style={styles.noQuestionsText}>No questions yet. Be the first to ask!</p>
                            <button 
                                onClick={handleAskQuestion}
                                style={styles.askButton}
                            >
                                Ask First Question
                            </button>
                        </div>
                    ) : (
                        questions.map((question, index) => (
                            <div key={question.id} style={styles.questionItem}>
                                <div 
                                    onClick={() => handleQuestionClick(question.id)}
                                    style={styles.questionContent}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                >
                                    <div style={styles.questionLayout}>
                                        {/* Profile Section */}
                                        <div style={styles.profileSection}>
                                            <div style={styles.profileCircle}>
                                                {question.user?.username?.charAt(0)?.toUpperCase() || '👤'}
                                            </div>
                                            <div style={styles.userName}>
                                                {question.user?.username}
                                            </div>
                                        </div>
                                        
                                        {/* Question Content */}
                                        <div style={styles.questionText}>
                                            <h3 style={styles.questionTitle}>{question.title}</h3>
                                            {question.description && (
                                                <p style={styles.questionDescription}>
                                                    {question.description.length > 150 
                                                        ? `${question.description.substring(0, 150)}...` 
                                                        : question.description
                                                    }
                                                </p>
                                            )}
                                            <div style={styles.questionMeta}>
                                                <span style={styles.answerCount}>
                                                    {question.answersCount || 0} answers
                                                </span>
                                                <span style={styles.questionDate}>
                                                    {new Date(question.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Separator line */}
                                {index < questions.length - 1 && (
                                    <hr style={styles.separator} />
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Refresh Button */}
                {questions.length > 0 && (
                    <div style={styles.refreshSection}>
                        <button 
                            onClick={handleRefresh}
                            style={styles.refreshButton}
                        >
                            Refresh Questions
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
        width: '100vw', // Full viewport width
        margin: 0,
        padding: 0,
        overflowX: 'hidden' // Prevent horizontal scroll
    },
    header: {
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: '100%',
        margin: 0,
        padding: 0
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 5%', // Use percentage for responsive padding
        maxWidth: '100%',
        margin: '0 auto'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#ff6b00',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: '1px'
    },
    navItem: {
        color: '#666',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'color 0.2s'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: '1px solid #333',
        color: '#333',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        transition: 'all 0.2s'
    },
    main: {
        width: '90%', 
        maxWidth: '1400px', 
        margin: '2rem auto',
        padding: 0
    },
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        width: '100%'
    },
    askButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
        minWidth: '140px'
    },
    welcomeText: {
        fontSize: '1.1rem',
        color: '#333',
        fontWeight: '500'
    },
    username: {
        color: '#ff9800',
        fontWeight: 'bold'
    },
    questionsContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: '2rem',
        width: '100%'
    },
    questionItem: {
        padding: '0',
        width: '100%'
    },
    questionContent: {
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        width: '100%',
        boxSizing: 'border-box'
    },
    questionLayout: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.5rem',
        width: '100%'
    },
    profileSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '80px',
        flexShrink: 0
    },
    profileCircle: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        border: '2px solid #e0e0e0',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        color: '#333'
    },
    userName: {
        color: '#ff9800',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    questionText: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 0
    },
    questionTitle: {
        margin: '0 0 0.5rem 0',
        color: '#333',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        wordBreak: 'break-word'
    },
    questionDescription: {
        margin: '0 0 0.5rem 0',
        color: '#666',
        fontSize: '1rem',
        lineHeight: '1.5',
        wordBreak: 'break-word'
    },
    questionMeta: {
        display: 'flex',
        gap: '1.5rem',
        fontSize: '0.9rem',
        color: '#666'
    },
    answerCount: {
        fontWeight: '500'
    },
    questionDate: {
        color: '#999'
    },
    separator: {
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        margin: '0'
    },
    noQuestions: {
        textAlign: 'center',
        padding: '4rem 2rem',
        width: '100%'
    },
    noQuestionsText: {
        marginBottom: '1.5rem',
        color: '#666',
        fontSize: '1.2rem'
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        fontSize: '18px',
        color: '#666',
        width: '100%'
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    errorContainer: {
        backgroundColor: '#ffeaa7',
        border: '1px solid #fdcb6e',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    errorText: {
        color: '#e17055',
        fontWeight: '500'
    },
    retryButton: {
        backgroundColor: '#e17055',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    refreshSection: {
        textAlign: 'center',
        width: '100%'
    },
    refreshButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    }
};

// Add CSS for spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);

export default Home;