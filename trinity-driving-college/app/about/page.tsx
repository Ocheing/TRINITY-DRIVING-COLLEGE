
import { Shield, Target, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />

                <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
                    <div>
                        <h2 className="text-base text-brand font-semibold tracking-wide uppercase">Who We Are</h2>
                        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            About Trinity Driving College
                        </h3>
                    </div>
                </div>

                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="relative lg:row-start-1 lg:col-start-2">
                        <svg
                            className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20 block h-42 w-42 text-gray-100"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>
                        <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                            <figure>
                                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                                    <div className="rounded-lg shadow-lg overflow-hidden bg-gray-200 h-64 lg:h-96 flex items-center justify-center">
                                        <span className="text-gray-400">Team/Office Image</span>
                                    </div>
                                </div>
                                <figcaption className="mt-3 flex text-sm text-gray-500">
                                    <CameraIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-2">Training Center, Nairobi</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                    <div className="mt-8 lg:mt-0">
                        <div className="text-base max-w-prose mx-auto lg:max-w-none">
                            <p className="text-lg text-gray-500">
                                Established with a mission to create safer roads, Trinity Driving College has been a leader in driver education for over a decade. We combine theoretical knowledge with practical experience to ensure our students become responsible drivers.
                            </p>
                        </div>

                        <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Core Values</h3>
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex items-start">
                                    <Shield className="flex-shrink-0 h-6 w-6 text-brand" />
                                    <span className="ml-3">
                                        <strong className="font-medium text-gray-900">Safety:</strong> The safety of our students and the community is our top priority.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Target className="flex-shrink-0 h-6 w-6 text-brand" />
                                    <span className="ml-3">
                                        <strong className="font-medium text-gray-900">Excellence:</strong> We strive for the highest standards in instruction and customer service.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Award className="flex-shrink-0 h-6 w-6 text-brand" />
                                    <span className="ml-3">
                                        <strong className="font-medium text-gray-900">Integrity:</strong> We operate with honesty and transparency in all our dealings.
                                    </span>
                                </li>
                            </ul>

                            <h3 className="mt-8 text-xl font-bold text-gray-900">Accreditation</h3>
                            <p>
                                We are fully accredited by the National Transport and Safety Authority (NTSA) and our curriculum meets all regulatory standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}
