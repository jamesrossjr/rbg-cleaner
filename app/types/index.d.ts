import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar: Avatar
  } & Link)[]
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

export interface Sale {
  id: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
}

export interface Mail {
  id: number
  subject: string
  body: string
  read: boolean
  date: string
  from: {
    name: string
    email: string
    avatar?: string
  }
}


export interface Notification {
  id: number
  read: boolean
  sender: {
    name: string
    avatar: {
      src: string
      alt?: string
    }
  }
  date: string
  body: string
}


export interface Member {
  id: number
  name: string
  username: string
  email: string
  role: 'admin' | 'editor' | 'viewer' | 'member' | 'owner'
  avatar?: {
    src: string
    alt?: string
  }
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: {
    src: string
    alt?: string
  }
  location: string
  status: 'subscribed' | 'unsubscribed' | 'bounced'
}
