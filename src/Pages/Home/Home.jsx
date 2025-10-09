import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import axios from '../../axiosConfig';
import styles from './home.module.css';


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
            const { data } = await axios.get('api/question');
            setQuestions(data.questions || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setError('Failed to load questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAskQuestion = () => {
        navigate('/question');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleQuestionClick = (questionId) => {
        navigate(`/question/${questionId}`);
    };

    const handleRefresh = () => {
        fetchQuestions();
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Loading questions...
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header - Full width */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerLeft}>
                        <div className={styles.logoContainer}>
                            <span className={styles.logoText}>EVANGADI</span>
                        </div>
                    </div>
                    
                    <div className={styles.headerRight}>
                        <span className={styles.navItem}>How it works</span>
                        <button 
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            LOG OUT
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Full width with proper padding */}
            <main className={styles.main}>
                {/* Top Section */}
                <div className={styles.topSection}>
                    <button 
                        onClick={handleAskQuestion}
                        className={styles.askButton}
                    >
                        Ask Question
                    </button>
                    
                    <span className={styles.welcomeText}>
                        Welcome: <span className={styles.username}>{user?.username || 'Guest'}</span>
                    </span>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={styles.errorContainer}>
                        <span className={styles.errorText}>{error}</span>
                        <button 
                            onClick={handleRefresh}
                            className={styles.retryButton}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Questions List */}
                <div className={styles.questionsContainer}>
                    {questions.length === 0 ? (
                        <div className={styles.noQuestions}>
                            <p className={styles.noQuestionsText}>No questions yet. Be the first to ask!</p>
                            <button 
                                onClick={handleAskQuestion}
                                className={styles.askButton}
                            >
                                Ask First Question
                            </button>
                        </div>
                    ) : (
                        questions.map((question, index) => (
                            <div key={question.id} className={styles.questionItem}>
                                <div 
                                    onClick={() => handleQuestionClick(question.id)}
                                    className={styles.questionContent}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                >
                                    <div className={styles.questionLayout}>
                                        {/* Profile Section */}
                                        <div className={styles.profileSection}>
                                            <div className={styles.profileCircle}>
                                                {question.user_name?.charAt(0)?.toUpperCase() || '👤'}
                                            </div>
                                            <div className={styles.userName}>
                                                {question.user_name}
                                            </div>
                                        </div>
                                        
                                        {/* Question Content */}
                                        <div className={styles.questionText}>
                                            <h3 className={styles.questionTitle}>{question.title}</h3>
                                            {question.content && (
                                                <p className={styles.questionDescription}>
                                                    {question.content.length > 150 
                                                        ? `${question.content.substring(0, 150)}...` 
                                                        : question.content
                                                    }
                                                </p>
                                            )}
                                            <div className={styles.questionMeta}>
                                                <span className={styles.answerCount}>
                                                    0 answers
                                                </span>
                                                <span className={styles.questionDate}>
                                                    {new Date().toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Separator line */}
                                {index < questions.length - 1 && (
                                    <hr className={styles.separator} />
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Refresh Button */}
                {questions.length > 0 && (
                    <div className={styles.refreshSection}>
                        <button 
                            onClick={handleRefresh}
                            className={styles.refreshButton}
                        >
                            Refresh Questions
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;