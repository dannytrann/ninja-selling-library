'use client'

import { useState, useMemo } from 'react'
import {
  BookOpen, Brain, Target, ListChecks, TrendingUp, Sparkles,
  Repeat, Heart, Mic, Clock, RefreshCw, Home, MessageCircle,
  ShoppingCart, Database, Phone, Users, Trophy, Search,
  BarChart3, Star, Megaphone, Scale, ShieldAlert, DoorOpen,
  Play, ExternalLink, ChevronDown, ChevronUp, GraduationCap,
  Library, Filter, X, Lightbulb, CheckCircle2, Moon, Sun,
} from 'lucide-react'
import { categories, allVideos, ninjaConcepts, type Category, type Video } from './ninjaLibraryData'

const iconMap: Record<string, React.ElementType> = {
  Brain, BookOpen, Target, ListChecks, TrendingUp, Sparkles,
  Repeat, Heart, Mic, Clock, RefreshCw, Home, MessageCircle,
  ShoppingCart, Database, Phone, Users, Trophy, Search,
  BarChart3, Star, Megaphone, Scale, ShieldAlert, DoorOpen,
}

type TabType = 'categories' | 'videos' | 'concepts'

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const toggle = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Toggle dark mode">
      {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  )
}

export default function NinjaLibraryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('categories')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null)
  const [expandedConcept, setExpandedConcept] = useState<string | null>('four-cornerstones')
  const [videoSearchQuery, setVideoSearchQuery] = useState('')

  const filteredVideos = useMemo(() => {
    if (!videoSearchQuery) return allVideos.slice(0, 50)
    const query = videoSearchQuery.toLowerCase()
    return allVideos.filter(v => v.title.toLowerCase().includes(query))
  }, [videoSearchQuery])

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories
    const query = searchQuery.toLowerCase()
    return categories.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const totalVideos = categories.reduce((sum, c) => sum + c.videoCount, 0)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-md">
                <Library className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-ninja-dark dark:text-white leading-tight">Ninja Selling Library</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{totalVideos} videos across {categories.length} topics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="https://www.youtube.com/@NinjaSelling"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube Channel
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ninja-dark dark:text-white mb-3">
            Master the Ninja Selling System
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse {totalVideos} videos from the official Ninja Selling YouTube channel, organized into {categories.length} topics
            with key concepts, principles, and actionable steps to build your relationship-based business.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[
              { id: 'categories' as TabType, label: 'Browse Topics', shortLabel: 'Topics', icon: Filter },
              { id: 'videos' as TabType, label: 'All Videos', shortLabel: 'Videos', icon: Play },
              { id: 'concepts' as TabType, label: 'Key Concepts', shortLabel: 'Concepts', icon: Lightbulb },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-ninja-dark dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Player Modal */}
        {playingVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setPlayingVideo(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-ninja-dark dark:text-white truncate pr-4">{playingVideo.title}</h3>
                <button onClick={() => setPlayingVideo(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${playingVideo.id}?autoplay=1`}
                  title={playingVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${playingVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-ninja-blue transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open on YouTube
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Category Detail Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={() => setSelectedCategory(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
              <div className={`bg-gradient-to-r ${selectedCategory.gradient} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const IconComp = iconMap[selectedCategory.icon] || BookOpen
                      return <IconComp className="w-8 h-8" />
                    })()}
                    <div>
                      <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                      <p className="text-white/80 text-sm">{selectedCategory.videoCount} videos</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-3 text-white/90 text-sm leading-relaxed">{selectedCategory.description}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Featured Videos</h3>
                <div className="space-y-2">
                  {selectedCategory.featuredVideos.map(video => (
                    <button
                      key={video.id}
                      onClick={() => setPlayingVideo(video)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                    >
                      <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ninja-dark dark:text-white text-sm leading-snug">{video.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href="https://www.youtube.com/@NinjaSelling/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ninja-blue hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View all {selectedCategory.videoCount} videos on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="mb-6 flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ninja-blue focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map(category => {
                const IconComp = iconMap[category.icon] || BookOpen
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left hover:shadow-lg hover:border-ninja-blue dark:hover:border-ninja-blue transition-all group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-md group-hover:shadow-lg transition-shadow`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-ninja-dark dark:text-white text-sm leading-snug">{category.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{category.videoCount} videos</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">{category.description}</p>
                    <div className="mt-3 flex -space-x-1">
                      {category.featuredVideos.slice(0, 3).map(v => (
                        <div key={v.id} className="w-10 h-7 rounded border-2 border-white dark:border-gray-800 overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${v.id}/default.jpg`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {category.videoCount > 3 && (
                        <div className="w-10 h-7 rounded border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">+{category.videoCount - 3}</span>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* All Videos Tab */}
        {activeTab === 'videos' && (
          <div>
            <div className="mb-6 flex justify-center">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={videoSearchQuery}
                  onChange={(e) => setVideoSearchQuery(e.target.value)}
                  placeholder={`Search across ${totalVideos} videos...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ninja-blue focus:border-transparent"
                />
              </div>
            </div>
            <div className="text-center mb-4">
              {videoSearchQuery ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing newest 50 of {totalVideos} videos. Search to find specific content.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVideos.map(video => (
                <button
                  key={video.id}
                  onClick={() => setPlayingVideo(video)}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-ninja-blue dark:hover:border-ninja-blue transition-all text-left group"
                >
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-ninja-dark dark:text-white text-sm leading-snug line-clamp-2">{video.title}</p>
                  </div>
                </button>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No videos found matching &quot;{videoSearchQuery}&quot;</p>
              </div>
            )}
          </div>
        )}

        {/* Key Concepts Tab */}
        {activeTab === 'concepts' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GraduationCap className="w-6 h-6 text-ninja-blue" />
                <h2 className="text-xl font-bold text-ninja-dark dark:text-white">Core Ninja Selling Concepts</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Master these foundational concepts to build a thriving relationship-based real estate business.
              </p>
            </div>

            <div className="space-y-3">
              {ninjaConcepts.map(concept => {
                const isExpanded = expandedConcept === concept.id
                return (
                  <div
                    key={concept.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md"
                  >
                    <button
                      onClick={() => setExpandedConcept(isExpanded ? null : concept.id)}
                      className="w-full p-5 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-ninja-blue/10 dark:bg-ninja-blue/20 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-ninja-blue" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-ninja-dark dark:text-white">{concept.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{concept.description}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700">
                        <div className="grid md:grid-cols-2 gap-6 pt-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Key Principles</h4>
                            <ul className="space-y-2">
                              {concept.principles.map((principle, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-ninja-blue mt-1.5 flex-shrink-0" />
                                  {principle}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Action Items</h4>
                            <ul className="space-y-2">
                              {concept.actionItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Content sourced from the{' '}
              <a href="https://www.youtube.com/@NinjaSelling" target="_blank" rel="noopener noreferrer" className="text-ninja-blue hover:underline font-medium">
                Ninja Selling YouTube Channel
              </a>
              {' '}({totalVideos} videos analyzed).
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Based on the Ninja Selling methodology by Larry Kendall.
              Book: <em>Ninja Selling: Subtle Skills. Big Results.</em>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
              This is a free educational resource. Not affiliated with Ninja Selling, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
