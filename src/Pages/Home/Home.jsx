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

export default Home;