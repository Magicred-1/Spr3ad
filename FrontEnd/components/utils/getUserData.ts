import { User } from '@/types/User'
export const getNameForUser = (user: User) => {
    return user.ens || user.name || user.address || ""
}

export const getImageForUser = (user: User) => {
    return user.img || "/defaultProfile.jpg"
}