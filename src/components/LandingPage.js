import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LandingPage() {
    return (
        <main className="main" style={{ 'background-image': `url('https://images.unsplash.com/photo-1736430043488-0c369959a5c6')`, 'backgroundSize': 'cover', 'backgroundPosition': 'center bottom' }}>
            <section id="hero" className="hero section">
                <div className="container d-flex flex-column justify-content-center align-items-center text-center position-relative p-5" style={{ 'backdropFilter': 'blur(5px)' }}>
                    {/* <img
                        src="https://images.unsplash.com/photo-1736430043488-0c369959a5c6"
                        alt="AI Technology"
                        className="w-50 img-thumbnail"
                    /> */}
                    <h1 className='text-white'>Welcome to Deepfake Gaurd</h1>
                    <p className='text-white'>Our advanced AI technology helps you identify manipulated images and videos
                        with high accuracy. Protect yourself from digital deception.</p>
                    <div className="d-flex">
                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                    </div>
                </div>

            </section>
            <section id="featured-services" className="featured-services section">

                <div className="container">

                    <div className="row gy-4 px-auto justify-content-center">
                        <h3 className="text-3xl font-bold text-center mb-12">
                            How It Works
                        </h3>
                        <div className="col-xl-3 col-md-6">
                            <div className="service-item position-relative d-flex flex-column align-items-center text-center">
                                <div className="icon"><i className="bi bi-upload"></i></div>
                                <h4>Upload</h4>
                                <p>Simply upload any video or public URL you want to analyze</p>
                            </div>
                        </div>


                        <div className="col-xl-3 col-md-6">
                            <div className="service-item position-relative d-flex flex-column align-items-center text-center">
                                <div className="icon"><i class="bi bi-bar-chart-line"></i></div>
                                <h4>Analyze</h4>
                                <p>Our AI model processes the content in minutes</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="service-item position-relative d-flex flex-column align-items-center text-center">
                                <div className="icon"><i className="bi bi-check-circle"></i></div>
                                <h4>Results</h4>
                                <p>Get analysis of your video</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
}