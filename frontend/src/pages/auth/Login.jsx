import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { button, cn, ui } from '../../components/common/ui.js'
import loginPhoto from '../../../UI/home/image 431.jpg'

const demoButton = 'cursor-pointer rounded-[20px] border border-rule px-3 py-1.5 text-[11px] text-leaf'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('customer@example.com')
  const [requested, setRequested] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    if (!requested) setRequested(true)
    else {
      const user = login(email)
      navigate(user.role === 'CUSTOMER' ? '/app' : user.role === 'ADMIN' ? '/admin' : '/business/dashboard')
    }
  }

  return <div className={cn(ui.page, 'min-h-[720px] gap-20 md:grid md:grid-cols-2')}>
    <div
      className="mb-12 flex min-h-[350px] items-end bg-cover bg-center p-8 md:mb-0 md:min-h-[570px]"
      style={{ backgroundImage: `linear-gradient(140deg, rgba(0,127,109,.2), rgba(204,227,213,.25)), url("${loginPhoto}")` }}
    >
      <span className={ui.artCaption}>PIAX<br /><strong className="text-xl">care, made personal.</strong></span>
    </div>
    <form className="max-w-[430px] self-center pb-10 md:pb-0" onSubmit={submit}>
      <span className={ui.eyebrow}>Welcome back</span>
      <h1 className={cn(ui.h1, 'text-[51px] md:text-[63px]')}>Good care<br /><em className={ui.accent}>starts here.</em></h1>
      <p className="mb-4 text-stone">Use a demo account to explore PIAX. No real account is created.</p>
      <label className={ui.label}>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={ui.input} /></label>
      {requested && (
        <label className={ui.label}>
          Demo OTP <small className="float-right font-normal text-leaf">Use 123456</small>
          <input placeholder="123456" inputMode="numeric" className={ui.input} />
        </label>
      )}
      <button className={cn(button.base, button.primary, button.full)} type="submit">
        {requested ? 'Continue with demo OTP' : 'Send demo OTP'} <ArrowRight size={17} />
      </button>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="w-full text-[11px] text-stone">Quick demo accounts</span>
        <button type="button" className={demoButton} onClick={() => setEmail('customer@example.com')}>Customer</button>
        <button type="button" className={demoButton} onClick={() => setEmail('business@example.com')}>Business</button>
        <button type="button" className={demoButton} onClick={() => setEmail('admin@example.com')}>Admin</button>
      </div>
    </form>
  </div>
}
