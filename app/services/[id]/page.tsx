import { servicesData } from '@/app/services/servicesData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Paintbrush2, Gem, Clock, Users } from 'lucide-react';

export default async function ServicePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const service = servicesData.find((s) => s.id === params.id);

    if (!service) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[#FDF8F3] relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12 bg-stone-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8F3] via-[#FDF8F3]/20 to-transparent" />
                </div>

                {/* Floating Back Button */}
                <div className="fixed top-32 left-6 md:left-12 z-50">
                    <Link
                        href="/services"
                        className="flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-500 group shadow-2xl"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Back to Services</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <span className="inline-block px-5 py-2 rounded-full border border-stone-900/10 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600 bg-white/30 backdrop-blur-md mb-8">
                        Our Expertise
                    </span>
                    <h1 className="text-6xl md:text-[10rem] font-light text-stone-900 leading-[0.85] tracking-tighter mb-8">
                        {service.title.split(' ')[0]} <br />
                        <span className="font-serif italic text-amber-600">{service.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="py-24 md:py-40 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Summary & Features */}
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-px bg-amber-600" />
                                <span className="text-xs uppercase tracking-[0.4em] font-bold text-amber-600">The Service</span>
                            </div>

                            <p className="text-2xl md:text-4xl font-light text-stone-600 leading-relaxed mb-16 italic">
                                &quot;{service.longDescription}&quot;
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="group p-10 rounded-[3rem] bg-white border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors duration-500">
                                            <Gem size={20} className="text-amber-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-medium text-stone-900 mb-4">{feature.title}</h3>
                                        <p className="text-stone-500 font-light leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Included List */}
                            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-sm border border-stone-100">
                                <h3 className="text-3xl font-light text-stone-900 mb-12 flex items-center gap-6">
                                    <CheckCircle2 className="text-amber-600" size={32} />
                                    Comprehensive Scope
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                    {service.details.included.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 py-4 border-b border-stone-50 group">
                                            <div className="w-2 h-2 rounded-full bg-amber-200 group-hover:bg-amber-600 transition-colors" />
                                            <span className="text-stone-600 font-light tracking-wide">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Specs Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-40 space-y-8">
                                <div className="bg-stone-900 rounded-[3rem] p-12 text-white shadow-2xl">
                                    <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-amber-400 mb-12">Process Overview</h4>

                                    <div className="space-y-12">
                                        <div>
                                            <div className="flex items-center gap-3 text-white/40 mb-3">
                                                <Paintbrush2 size={16} />
                                                <span className="uppercase text-[10px] tracking-widest font-bold">Approach</span>
                                            </div>
                                            <p className="text-lg font-light text-stone-200 leading-relaxed">{service.details.approach}</p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 text-white/40 mb-3">
                                                <Clock size={16} />
                                                <span className="uppercase text-[10px] tracking-widest font-bold">Timeline</span>
                                            </div>
                                            <p className="text-lg font-light text-stone-200 leading-relaxed">{service.details.timeline}</p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 text-white/40 mb-3">
                                                <Users size={16} />
                                                <span className="uppercase text-[10px] tracking-widest font-bold">Suitable For</span>
                                            </div>
                                            <p className="text-lg font-light text-stone-200 leading-relaxed">{service.details.suitableFor}</p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-16 bg-amber-600 text-white py-6 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-amber-700 transition-all shadow-xl shadow-amber-600/20">
                                        Book Free Consultation
                                    </button>
                                </div>

                                <div className="p-12 border border-stone-200 rounded-[3rem]">
                                    <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-stone-400 mb-8">Premium Materials</h4>
                                    <p className="text-stone-600 font-light text-sm leading-relaxed mb-0">
                                        {service.details.materials}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
