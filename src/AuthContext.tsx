import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export type UserProfile = {
  fullName: string
  email: string
  role: string
  department: string
  bio: string
  isAdmin: boolean
}

type SignupData = {
  fullName: string
  email: string
  password: string
  role: string
}

type AuthContextType = {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signup: (data: SignupData) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile)
          }
        } catch (error) {
          console.error('Could not load profile', error)
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = async ({ fullName, email, password, role }: SignupData) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    const newProfile: UserProfile = {
      fullName,
      email,
      role,
      department: '',
      bio: '',
      isAdmin: false,
    }
    await setDoc(doc(db, 'users', credential.user.uid), newProfile)
    setProfile(newProfile)
  }

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}