import React, { useContext } from 'react'
import { AnimalContext } from '../Context'

const List = () => {
    const { animalImg, animal } = useContext(AnimalContext)
  return (
    <div>
        {
                /* animalImg.map((im, key) => {

                    if (im.PHOTO_KND == "THUMB") {
                        if (im.ANIMAL_NO == '2424')
                            return <img key={key} src={`https://${im.PHOTO_URL}`}></img>
                    }


                }) */
            }
    </div>
  )
}

export default List