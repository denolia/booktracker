package com.denolia

import com.mongodb.client.MongoCollection
import org.litote.kmongo.KMongo
import org.litote.kmongo.eq
import org.litote.kmongo.findOne
import org.litote.kmongo.getCollection
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger("com.denolia.get_all_books")

data class Book(val name: String, val progress: Int)

fun get_mongo_collection(): MongoCollection<Book> {
    val client = KMongo.createClient() //get com.mongodb.MongoClient new instance
    val database = client.getDatabase("test") //normal java driver usage
    val col = database.getCollection<Book>("testbookshelf") //KMongo extension method
    return col
}

fun initialize_db(args: Array<String>) {
    val col = get_mongo_collection()
    col.insertOne(Book("Dark Tower", 70))
    col.insertOne(Book("Significant digits", 2))
    col.insertOne(Book("Петрановская, Привязанность", 25))
    col.insertOne(Book("Винни Пух и дао де цзин", 1))
    col.insertOne(Book("Источник, Айн Ренд", 0))
    col.insertOne(Book("Множественные миры Билли Миллигана", 0))

    val tower: Book? = col.findOne(Book::name eq "Dark Tower")
    println(tower)
}

fun get_all_books(): List<Book> {
    val col = get_mongo_collection()
    logger.debug("Reading all book shelf...")
    val result = col.find().toList() // todo this is not lazy
    logger.debug(result.toString())
    return result
}
