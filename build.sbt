name := "connections"

version := "0.1"

scalaVersion := "2.9.2"

libraryDependencies ++= Seq(
    "net.databinder" %% "unfiltered-filter" % "0.6.3",
    "net.databinder" %% "unfiltered-jetty" % "0.6.3",
    "org.clapper" %% "avsl" % "0.4",
    "org.scalatest" %% "scalatest" % "1.6.1" % "test",
    "postgresql" % "postgresql" % "9.1-901.jdbc4",
    "com.jolbox" % "bonecp" % "0.7.1.RELEASE"
)
