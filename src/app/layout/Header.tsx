import { SearchBar } from '../../components/SearchBar'
import { Avatar } from '../../components/Avatar'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'

export default function HeaderLayout() {
  const { crumbs, id } = useBreadcrumbs()

  return (
    <header className="relative flex h-14 items-center justify-between border-b border-zinc-300 bg-zinc-100 px-6">
      <div className="flex w-full items-center justify-between gap-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            return (
              <Fragment key={index}>
                {index > 0 && <span className="text-zinc-400">/</span>}
                <span className={isLast ? 'font-semibold text-zinc-800' : 'text-zinc-500'}>
                  {'Component' in crumb ? (
                    <crumb.Component id={id as string} />
                  ) : crumb.to ? (
                    <Link to={crumb.to} className="hover:text-zinc-800">
                      {crumb.label}
                    </Link>
                  ) : (
                    crumb.label
                  )}
                </span>
              </Fragment>
            )
          })}
        </nav>
        <div className="flex items-center gap-4">
          <SearchBar />

          {/* TODO: Implementar User Profile Button */}
          <button type="button" className="cursor-pointer" onClick={() => {}}>
            <Avatar funcionarioNome="Erik Pereira" size="sm" />
          </button>
        </div>
      </div>
    </header>
  )
}
