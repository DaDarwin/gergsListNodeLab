import { dbContext } from "../db/DbContext.js"




class HousesService{
  async createHouse(houseData) {
    const house = await dbContext.houses.create(houseData)
    return house
  }

  async getHouses() {
    const houses = await dbContext.houses.find()
    return houses
  }
  async getOneHouse(houseId) {
    const house = await dbContext.houses.findById(houseId)
    if(!house){// NULL check
      throw new Error(`Could not get, no house at id: ${houseId}`)
    }
    return house
  }
  async searchHouses(searchEngine) {
    const houses = await dbContext.houses.find({engineType: searchEngine})
    return houses
  }
  async removeHouse(houseId) {
    const houseToRemove = await dbContext.houses.findById(houseId)
    if(!houseToRemove){ 
      throw new Error(`OOPS something went wrong, Could not delete, no cat id: ${houseId}`)
    }
    await houseToRemove.remove() 
    return `${houseToRemove.year} ${houseToRemove.bedrooms} house was removed.`
  }
  async updateHouse(houseId, updateData) {
    const originalhouse = await this.getOneHouse(houseId)
    



    await originalhouse.save()
    return originalhouse
  }
}

export const housesService = new HousesService()