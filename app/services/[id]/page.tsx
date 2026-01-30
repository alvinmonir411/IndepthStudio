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
        <main className="min-h-screen bg-stone-50 py-24 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
                >
                    <ArrowLeft size={16} />
                    Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Visuals */}
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="py-8">
                        <span className="text-amber-600 uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
                            Our Excellence
                        </span>
                        <h1 className="text-5xl md:text-7xl font-light text-stone-900 mb-8 leading-tight">
                            {service.title.split(' ')[0]} <br />
                            <span className="font-serif italic text-stone-500">{service.title.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        <p className="text-xl text-stone-600 font-light leading-relaxed mb-12 max-w-xl">
                            {service.shortDescription}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-amber-600">
                                    <CheckCircle2 size={24} />
                                    <h4 className="uppercase tracking-widest text-sm font-bold">Scope of Work</h4>
                                </div>
                                <ul className="space-y-4">
                                    {service.details.included.map((item, i) => (
                                        <li key={i} className="text-stone-500 font-light flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-amber-600">
                                    <Paintbrush2 size={24} />
                                    <h4 className="uppercase tracking-widest text-sm font-bold">Design Approach</h4>
                                </div>
                                <p className="text-stone-500 font-light leading-relaxed">
                                    {service.details.approach}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 py-10 border-t border-b border-stone-200 mb-12">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <Gem size={16} />
                                    <span className="uppercase text-[10px] tracking-widest font-bold">Materials</span>
                                </div>
                                <p className="text-sm text-stone-900 font-medium">{service.details.materials}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <Clock size={16} />
                                    <span className="uppercase text-[10px] tracking-widest font-bold">Timeline</span>
                                </div>
                                <p className="text-sm text-stone-900 font-medium">{service.details.timeline}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <Users size={16} />
                                    <span className="uppercase text-[10px] tracking-widest font-bold">Audience</span>
                                </div>
                                <p className="text-sm text-stone-900 font-medium">{service.details.suitableFor}</p>
                            </div>
                        </div>

                        <button className="bg-amber-600 text-white px-12 py-5 rounded-2xl uppercase tracking-widest text-sm font-bold hover:bg-amber-700 transition-all shadow-xl shadow-amber-600/20">
                            Book Free Consultation
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
