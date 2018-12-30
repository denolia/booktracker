package com.example

import org.litote.kmongo.KMongo
import org.litote.kmongo.eq
import org.litote.kmongo.findOne
import org.litote.kmongo.getCollection

data class Book(val name: String, val progress: Int)

val client = KMongo.createClient() //get com.mongodb.MongoClient new instance
val database = client.getDatabase("test") //normal java driver usage
val col = database.getCollection<Book>("testbookshelf") //KMongo extension method

fun main(args: Array<String>) {
    col.insertOne(Book("Dark Tower", 70))
    col.insertOne(Book("Significant digits", 2))
    col.insertOne(Book("Петрановская, Привязанность", 25))
    col.insertOne(Book("Винни Пух и дао де цзин", 1))
    col.insertOne(Book("Источник, Айн Ренд", 0))
    col.insertOne(Book("Множественные миры Билли Миллигана", 0))

    val tower: Book? = col.findOne(Book::name eq "Dark Tower")
    println(tower)
}

