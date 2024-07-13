import { User } from '@/types/User'
export const getNameForUser = (user: User) => {
    return user.name || user.ens || user.address || ""
}

export const getImageForUser = (user: User) => {
    return user.img || "/defaultProfile.jpg"
}