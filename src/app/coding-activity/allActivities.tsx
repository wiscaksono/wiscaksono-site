import { HiTerminal } from 'react-icons/hi'
import { BsActivity } from 'react-icons/bs'
import { BiText } from 'react-icons/bi'
import { SiArchlinux } from 'react-icons/si'

import * as Part from './partials'

export const allActivity = [
  {
    title: 'Languanges',
    slug: '',
    component: Part.Languanges,
    icon: HiTerminal
  },
  {
    title: 'Activity',
    slug: 'activity',
    component: Part.Activity,
    icon: BsActivity
  },
  {
    title: 'Code Editor',
    slug: 'code-editor',
    component: Part.CodeEditor,
    icon: BiText
  },
  {
    title: 'Operating Systems',
    slug: 'operating-systems',
    component: Part.OperatingSystems,
    icon: SiArchlinux
  }
]
