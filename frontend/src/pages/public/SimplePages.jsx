import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { button, cn, ui } from '../../components/common/ui.js'
import simplePhoto from '../../../UI/home/image 432.jpg'

export function SimplePage({ eyebrow, title, text, action, to }) {
  return <div className={cn(ui.page, 'min-h-[700px] gap-12 md:grid md:grid-cols-2')}>
    <div className="max-w-[550px] self-center">
      <span className={ui.eyebrow}>{eyebrow}</span>
      <h1 className={cn(ui.h1, 'text-[51px] md:text-[65px]')}>{title}</h1>
      <p className="mb-8 text-[17px] text-stone">{text}</p>
      {action && <Link className={cn(button.base, button.primary)} to={to}>{action} <ArrowRight size={17} /></Link>}
    </div>
    <div
      className="mb-12 flex min-h-[350px] items-end bg-cover bg-center p-8 md:mb-0 md:min-h-[540px]"
      style={{ backgroundImage: `linear-gradient(140deg, rgba(0,127,109,.2), rgba(204,227,213,.25)), url("${simplePhoto}")` }}
    >
      <span className={ui.artCaption}>PIAX<br /><strong className="text-xl">made with care.</strong></span>
    </div>
  </div>
}

const Accent = ({ children }) => <em className={ui.accent}>{children}</em>

export function About() {
  return <SimplePage eyebrow="Our story" title={<>Care is a practice,<br /><Accent>not a checkbox.</Accent></>} text="PIAX exists to make period care feel more considered: products that respect your body, information that respects your questions, and a little more room to feel like yourself." />
}

export function Sustainability() {
  return <SimplePage eyebrow="Sustainability" title={<>Better choices,<br /><Accent>step by step.</Accent></>} text="We are building a period care system that pays attention to materials, packaging and the everyday decisions that add up over time." />
}

export function BusinessLanding() {
  return <SimplePage eyebrow="For business" title={<>Care that works<br /><Accent>at work, too.</Accent></>} text="Make thoughtful period care available for the people who keep your workplace moving." action="Explore business demo" to="/login" />
}

export function Support() {
  return <SimplePage eyebrow="Support" title={<>You can ask<br /><Accent>anything.</Accent></>} text="Find calm answers about orders, fit, delivery and product care. This support space is part of the frontend demo." action="Ask PIAX AI" to="/ai" />
}
