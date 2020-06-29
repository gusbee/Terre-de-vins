<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass="App\Repository\EvenementRepository")
 */
class Evenement
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("evenement")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $link;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $comments;

    /**
     * @ORM\Column(type="date")
     * @Groups("evenement")
     */
    private $pubDate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $creator;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $guid;

    /**
     * @ORM\Column(type="text")
     * @Groups("evenement")
     */
    private $description;

    /**
     * @ORM\Column(type="text")
     * @Groups("evenement")
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $commentRss;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $commentsSlash;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */

    private $startdate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */

    private $enddate;
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $location;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("evenement")
     */
    private $zip;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("evenement")
     */
    private $city;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(string $comments): self
    {
        $this->comments = $comments;

        return $this;
    }

    public function getPubDate(): ?\DateTimeInterface
    {
        return $this->pubDate;
    }

    public function setPubDate(\DateTimeInterface $pubDate): self
    {
        $this->pubDate = $pubDate;

        return $this;
    }

    public function getCreator(): ?string
    {
        return $this->creator;
    }

    public function setCreator(string $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getGuid(): ?string
    {
        return $this->guid;
    }

    public function setGuid(string $guid): self
    {
        $this->guid = $guid;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCommentRss(): ?string
    {
        return $this->commentRss;
    }

    public function setCommentRss(string $commentRss): self
    {
        $this->commentRss = $commentRss;

        return $this;
    }

    public function getCommentsSlash(): ?string
    {
        return $this->commentsSlash;
    }

    public function setCommentsSlash(string $commentsSlash): self
    {
        $this->commentsSlash = $commentsSlash;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getStartdate()
    {
        return $this->startdate;
    }

    /**
     * @param mixed $startdate
     */
    public function setStartdate($startdate): void
    {
        $this->startdate = $startdate;
    }

    /**
     * @return mixed
     */
    public function getEnddate()
    {
        return $this->enddate;
    }

    /**
     * @param mixed $enddate
     */
    public function setEnddate($enddate): void
    {
        $this->enddate = $enddate;
    }

    /**
     * @return mixed
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param mixed $location
     */
    public function setLocation($location): void
    {
        $this->location = $location;
    }

    /**
     * @return mixed
     */
    public function getAdress()
    {
        return $this->adress;
    }

    /**
     * @param mixed $adress
     */
    public function setAdress($adress): void
    {
        $this->adress = $adress;
    }

    /**
     * @return mixed
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * @param mixed $zip
     */
    public function setZip($zip): void
    {
        $this->zip = $zip;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     */
    public function setCity($city): void
    {
        $this->city = $city;
    }

}
