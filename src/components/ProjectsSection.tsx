import {
  ArrowUpRight,
  Building,
  ChevronLeft,
  ChevronRight,
  Images,
  Info,
  X,
} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {
  ProjectCategory,
  ProjectGalleryImage,
  ProjectItem,
  SITE_CONFIG,
} from '../data/siteConfig';

interface ProjectsSectionProps {
  onInquireProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Residential',
  'Commercial',
  'Renovation',
  'Development',
];

export function ProjectsSection({onInquireProject}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProjects = useMemo<readonly ProjectItem[]>(() => {
    if (activeCategory === 'All') {
      return SITE_CONFIG.projects;
    }
    return SITE_CONFIG.projects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  const modalGallery: ProjectGalleryImage[] = useMemo(() => {
    if (!selectedProject) return [];
    if (selectedProject.gallery && selectedProject.gallery.length > 0) {
      return selectedProject.gallery;
    }
    return [
      {
        src: selectedProject.image,
        alt: selectedProject.imageAlt,
        caption: selectedProject.overview,
        sectionLabel: selectedProject.category,
      },
    ];
  }, [selectedProject]);

  const openProjectGallery = (project: ProjectItem, startIndex = 0) => {
    setSelectedProject(project);
    setActiveGalleryIndex(startIndex);
  };

  // Keyboard navigation in Lightbox Modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      } else if (event.key === 'ArrowRight' && modalGallery.length > 1) {
        setActiveGalleryIndex((prev) => (prev + 1) % modalGallery.length);
      } else if (event.key === 'ArrowLeft' && modalGallery.length > 1) {
        setActiveGalleryIndex(
          (prev) => (prev - 1 + modalGallery.length) % modalGallery.length,
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, modalGallery.length]);

  const handleImageError = (key: string) => {
    setFailedImages((prev) => ({...prev, [key]: true}));
  };

  return (
    <section id="projects" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5DFD2]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1D4ED8] tracking-wide">
              Projects Portfolio
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
              Architectural studies across residential, commercial, and mixed-use spaces.
            </h2>
          </div>

          {/* Functional Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E5DFD2] bg-white p-1.5 self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                    isActive
                      ? 'bg-[#0B1B3B] text-white'
                      : 'text-[#334155] hover:bg-[#FAF8F4] hover:text-[#0B1B3B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Notice */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#E5DFD2] bg-white px-4 py-3 text-xs sm:text-sm text-[#475569]">
          <Info
            className="h-4 w-4 text-[#1D4ED8] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p>{SITE_CONFIG.projectsNotice}</p>
        </div>

        {/* Portfolio Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 rounded-xl border border-[#E5DFD2] bg-white p-12 text-center">
            <p className="font-display text-lg font-semibold text-[#0B1B3B]">
              No {activeCategory.toLowerCase()} projects published in the portfolio yet.
            </p>
            <p className="mt-2 text-sm text-[#64748B]">
              We showcase only genuine company projects and confirmed photography. Contact us to discuss your {activeCategory.toLowerCase()} requirements.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="rounded-md bg-[#0B1B3B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer min-h-[44px]"
              >
                Show All Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredProjects.map((project) => {
              const isFeaturedShowcase =
                !project.isPlaceholder &&
                Boolean(project.gallery && project.gallery.length > 2);
              const isPortrait = project.imageOrientation === 'portrait';
              const imgFailed = failedImages[project.id];

              if (isFeaturedShowcase) {
                const extraGallery = project.gallery
                  ? project.gallery.slice(1)
                  : [];

                return (
                  <article
                    key={project.id}
                    className="md:col-span-2 overflow-hidden rounded-xl border border-[#E5DFD2] bg-white transition-colors duration-150 hover:border-[#1D4ED8]/50"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Left: Authentic Exterior Cover Photograph */}
                      <button
                        type="button"
                        onClick={() => openProjectGallery(project, 0)}
                        aria-label={`Open photo gallery for ${project.title}`}
                        className={`group relative w-full overflow-hidden bg-[#0B1B3B] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                          isPortrait
                            ? 'lg:col-span-6 flex items-center justify-center p-4 sm:p-6 min-h-[380px] sm:min-h-[460px]'
                            : 'lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[430px]'
                        }`}
                      >
                        {!imgFailed ? (
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            referrerPolicy="no-referrer"
                            decoding="async"
                            onError={() => handleImageError(project.id)}
                            className={`transition-transform duration-300 group-hover:scale-[1.02] ${
                              isPortrait
                                ? 'max-h-[460px] w-auto max-w-full rounded-md object-contain'
                                : 'h-full w-full object-cover object-center'
                            }`}
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[#0B1B3B] to-[#1E40AF] flex flex-col items-center justify-center p-6 text-white">
                            <Building
                              className="h-12 w-12 text-white/40 mb-2"
                              aria-hidden="true"
                            />
                            <span className="font-display text-base font-semibold">
                              {project.title}
                            </span>
                          </div>
                        )}
                      </button>

                      {/* Right: Featured Project Details */}
                      <div
                        className={`flex flex-col justify-between p-6 sm:p-8 lg:p-9 ${
                          isPortrait ? 'lg:col-span-6' : 'lg:col-span-5'
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                            <span className="font-semibold text-[#1D4ED8]">
                              {project.badgeLabel ??
                                `Featured ${project.category} Project`}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.scaleLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-[#0B1B3B]">
                              {project.yearOrPhase}
                            </span>
                          </div>

                          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
                            {project.title}
                          </h3>

                          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#334155]">
                            {project.overview}
                          </p>

                          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 border-t border-[#E5DFD2] pt-5 text-sm">
                            <div className="flex items-baseline justify-between gap-4">
                              <dt className="text-xs font-medium text-[#64748B]">
                                Location
                              </dt>
                              <dd className="font-semibold text-[#0B1B3B] text-right">
                                {project.locationLabel}
                              </dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4">
                              <dt className="text-xs font-medium text-[#64748B]">
                                {project.scaleHeading ?? 'Plot Size'}
                              </dt>
                              <dd className="font-semibold text-[#0B1B3B] tabular-nums text-right">
                                {project.scaleLabel}
                              </dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4">
                              <dt className="text-xs font-medium text-[#64748B]">
                                {project.statusHeading ?? 'Status'}
                              </dt>
                              <dd className="font-semibold text-[#1D4ED8] text-right">
                                {project.yearOrPhase}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div className="mt-7 pt-5 border-t border-[#E5DFD2] flex flex-wrap items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => openProjectGallery(project, 0)}
                            className="inline-flex items-center gap-2 rounded-md bg-[#0B1B3B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer min-h-[44px]"
                          >
                            <Images className="h-4 w-4" aria-hidden="true" />
                            <span>
                              View Gallery ({project.gallery?.length ?? 1} Photos)
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onInquireProject(project)}
                            className="text-sm font-semibold text-[#1D4ED8] hover:text-[#0B1B3B] transition-colors cursor-pointer min-h-[40px]"
                          >
                            Request Consultation
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Project Photo Gallery Strip */}
                    {extraGallery.length > 0 && (
                      <div className="border-t border-[#E5DFD2] bg-[#FAF8F4]/80 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <p className="font-display text-sm font-bold text-[#0B1B3B]">
                            {project.galleryHeading ??
                              (project.yearOrPhase === 'Under Construction'
                                ? 'Interior, Staircase, Courtyard & Landscaping Progress'
                                : 'Courtyard, Staircase, Living Spaces & Bedrooms Gallery')}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            Select any photograph to inspect full view
                          </p>
                        </div>

                        <div
                          className={`grid gap-3 ${
                            extraGallery.length === 4
                              ? 'grid-cols-2 sm:grid-cols-4'
                              : extraGallery.length > 6
                                ? 'grid-cols-2 sm:grid-cols-5'
                                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
                          }`}
                        >
                          {extraGallery.map((photo, gIndex) => {
                            const thumbKey = `${project.id}-thumb-${gIndex + 1}`;
                            const thumbFailed = failedImages[thumbKey];

                            return (
                              <button
                                key={photo.src}
                                type="button"
                                onClick={() =>
                                  openProjectGallery(project, gIndex + 1)
                                }
                                aria-label={`Open ${photo.sectionLabel} photograph for ${project.title}`}
                                className="group/thumb flex flex-col overflow-hidden rounded-lg border border-[#E5DFD2] bg-white text-left transition-colors hover:border-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
                              >
                                <div
                                  className={`w-full overflow-hidden bg-[#0B1B3B] ${
                                    isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
                                  }`}
                                >
                                  {!thumbFailed ? (
                                    <img
                                      src={photo.src}
                                      alt={photo.alt}
                                      loading="lazy"
                                      decoding="async"
                                      referrerPolicy="no-referrer"
                                      onError={() => handleImageError(thumbKey)}
                                      style={{
                                        objectPosition:
                                          photo.objectPosition ?? 'center center',
                                      }}
                                      className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-[1.04]"
                                    />
                                  ) : (
                                    <div className="h-full w-full bg-[#0B1B3B] flex items-center justify-center">
                                      <Building
                                        className="h-6 w-6 text-white/30"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="px-2.5 py-2">
                                  <p className="text-xs font-semibold text-[#0B1B3B] truncate group-hover/thumb:text-[#1D4ED8] transition-colors">
                                    {photo.sectionLabel}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </article>
                );
              }

              return (
                <article
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#E5DFD2] bg-white transition-colors duration-150 hover:border-[#1D4ED8]/50"
                >
                  {/* Large Photograph Slot */}
                  <button
                    type="button"
                    onClick={() => openProjectGallery(project, 0)}
                    aria-label={`View details for ${project.title}`}
                    className="relative w-full aspect-[4/3] overflow-hidden bg-[#0B1B3B] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    {!imgFailed ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(project.id)}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#0B1B3B] to-[#1E40AF] flex flex-col items-center justify-center p-6 text-white">
                        <Building className="h-10 w-10 text-white/40 mb-2" aria-hidden="true" />
                        <span className="font-display text-sm font-semibold">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071228]/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </button>

                  {/* Card Details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                        <span className="font-semibold text-[#1D4ED8]">
                          {project.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.scaleLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {project.isPlaceholder
                            ? 'Illustrative Concept'
                            : project.yearOrPhase}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-display text-xl font-bold text-[#0B1B3B]">
                        {project.title}
                      </h3>

                      {!project.isPlaceholder && (
                        <p className="mt-1 text-xs font-medium text-[#64748B]">
                          Location: {project.locationLabel}
                        </p>
                      )}

                      <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                        {project.overview}
                      </p>

                      {/* Multi-angle exterior preview strip when 2 exterior photos exist */}
                      {!project.isPlaceholder &&
                        project.gallery &&
                        project.gallery.length > 1 && (
                          <div className="mt-4 pt-4 border-t border-[#E5DFD2]">
                            <p className="text-xs font-semibold text-[#0B1B3B] mb-2">
                              Exterior Gallery ({project.gallery.length} Angles)
                            </p>
                            <div className="grid grid-cols-2 gap-2.5">
                              {project.gallery.map((photo, gIdx) => {
                                const thumbKey = `${project.id}-card-thumb-${gIdx}`;
                                const thumbFailed = failedImages[thumbKey];
                                return (
                                  <button
                                    key={photo.src}
                                    type="button"
                                    onClick={() =>
                                      openProjectGallery(project, gIdx)
                                    }
                                    aria-label={`Open ${photo.sectionLabel} photograph for ${project.title}`}
                                    className="group/thumb flex items-center gap-2.5 rounded-lg border border-[#E5DFD2] bg-[#FAF8F4] p-1.5 text-left transition-colors hover:border-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] cursor-pointer"
                                  >
                                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded bg-[#0B1B3B]">
                                      {!thumbFailed ? (
                                        <img
                                          src={photo.src}
                                          alt={photo.sectionLabel}
                                          loading="lazy"
                                          decoding="async"
                                          referrerPolicy="no-referrer"
                                          onError={() =>
                                            handleImageError(thumbKey)
                                          }
                                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover/thumb:scale-[1.05]"
                                        />
                                      ) : (
                                        <div className="h-full w-full bg-[#0B1B3B]" />
                                      )}
                                    </div>
                                    <span className="text-xs font-semibold text-[#0B1B3B] group-hover/thumb:text-[#1D4ED8] transition-colors line-clamp-2">
                                      {photo.sectionLabel}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#E5DFD2] flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => openProjectGallery(project, 0)}
                        className="text-sm font-semibold text-[#0B1B3B] hover:text-[#1D4ED8] transition-colors cursor-pointer min-h-[40px] inline-flex items-center gap-1.5"
                      >
                        <span>
                          {project.isPlaceholder
                            ? 'View Concept Details'
                            : project.gallery && project.gallery.length > 1
                              ? `View Exterior Gallery (${project.gallery.length} Photos)`
                              : 'View Exterior Details'}
                        </span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </button>

                      {!project.isPlaceholder && (
                        <button
                          type="button"
                          onClick={() => onInquireProject(project)}
                          className="text-xs font-semibold text-[#1D4ED8] hover:text-[#0B1B3B] transition-colors cursor-pointer min-h-[40px]"
                        >
                          Request Consultation
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Accessible Project Detail Gallery & Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#071228]/85 backdrop-blur-xs p-3 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl border border-[#E5DFD2] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project preview"
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#0B1B3B]/90 text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" />
            </button>

            {(() => {
              const activePhoto =
                modalGallery[activeGalleryIndex] ?? modalGallery[0];
              const modalImgKey = `${selectedProject.id}-modal-${activeGalleryIndex}`;
              const modalImgFailed = failedImages[modalImgKey];

              return (
                <>
                  {/* Main Lightbox Viewer */}
                  <div className="relative w-full h-[46vh] sm:h-[58vh] bg-[#071228] overflow-hidden flex items-center justify-center">
                    {!modalImgFailed && activePhoto ? (
                      <img
                        src={activePhoto.src}
                        alt={activePhoto.alt}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(modalImgKey)}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="h-72 w-full bg-gradient-to-br from-[#0B1B3B] to-[#1E40AF] flex items-center justify-center text-white">
                        <Building
                          className="h-14 w-14 text-white/30"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {modalGallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveGalleryIndex(
                              (prev) =>
                                (prev - 1 + modalGallery.length) %
                                modalGallery.length,
                            )
                          }
                          aria-label="Previous photograph"
                          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#0B1B3B]/85 text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveGalleryIndex(
                              (prev) => (prev + 1) % modalGallery.length,
                            )
                          }
                          aria-label="Next photograph"
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#0B1B3B]/85 text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Factual Caption & Multi-Photo Thumbnail Selector */}
                  {(modalGallery.length > 1 || !selectedProject.isPlaceholder) &&
                    activePhoto && (
                      <div className="border-b border-[#E5DFD2] bg-[#FAF8F4] px-5 py-4 sm:px-8">
                        <div
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                            modalGallery.length > 1 ? 'mb-3' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs text-[#64748B] shrink-0">
                            <span className="font-semibold tabular-nums text-[#1D4ED8]">
                              {String(activeGalleryIndex + 1).padStart(2, '0')}{' '}
                              / {String(modalGallery.length).padStart(2, '0')}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-[#0B1B3B]">
                              {activePhoto.sectionLabel}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#334155]">
                            {activePhoto.caption}
                          </p>
                        </div>

                        {modalGallery.length > 1 && (
                          <div
                            className={`grid gap-2 ${
                              modalGallery.length === 5
                                ? 'grid-cols-5'
                                : modalGallery.length > 7
                                  ? 'grid-cols-4 sm:grid-cols-6'
                                  : 'grid-cols-4 sm:grid-cols-7'
                            }`}
                          >
                            {modalGallery.map((item, idx) => {
                              const isSelected = idx === activeGalleryIndex;
                              return (
                                <button
                                  key={item.src}
                                  type="button"
                                  onClick={() => setActiveGalleryIndex(idx)}
                                  aria-label={`View ${item.sectionLabel}`}
                                  aria-pressed={isSelected}
                                  className={`overflow-hidden rounded-md border bg-white text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                                    isSelected
                                      ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]'
                                      : 'border-[#E5DFD2] opacity-75 hover:opacity-100'
                                  }`}
                                >
                                  <div
                                    className={`w-full bg-[#0B1B3B] ${
                                      selectedProject.imageOrientation ===
                                      'portrait'
                                        ? 'aspect-[3/4]'
                                        : 'aspect-[4/3]'
                                    }`}
                                  >
                                    <img
                                      src={item.src}
                                      alt={item.sectionLabel}
                                      loading="lazy"
                                      decoding="async"
                                      referrerPolicy="no-referrer"
                                      style={{
                                        objectPosition:
                                          item.objectPosition ??
                                          'center center',
                                      }}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                </>
              );
            })()}

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                <span className="font-semibold text-[#1D4ED8]">
                  {selectedProject.badgeLabel ?? selectedProject.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.locationLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{selectedProject.scaleLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#0B1B3B]">
                  {selectedProject.yearOrPhase}
                </span>
              </div>

              <h3
                id="project-modal-title"
                className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#0B1B3B]"
              >
                {selectedProject.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#334155]">
                {selectedProject.overview}
              </p>

              <div className="mt-6 pt-6 border-t border-[#E5DFD2]">
                <h4 className="font-display text-sm font-bold text-[#0B1B3B]">
                  Key Architectural Scope
                </h4>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedProject.scopeHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-lg border border-[#E5DFD2] bg-[#FAF8F4] px-4 py-3 text-xs sm:text-sm text-[#334155]"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const proj = selectedProject;
                    setSelectedProject(null);
                    onInquireProject(proj);
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Inquire About Similar Scope</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-md border border-[#E5DFD2] px-5 py-3 text-sm font-medium text-[#334155] hover:bg-[#FAF8F4] transition-colors cursor-pointer min-h-[44px]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
