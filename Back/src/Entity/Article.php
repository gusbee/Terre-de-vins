<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ArticleRepository")
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("article")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $link;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $comments;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("article")
     */
    private $pubDate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $creator;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $guid;

    /**
     * @ORM\Column(type="text")
     * @Groups("article")
     */
    private $description;

    /**
     * @ORM\Column(type="text")
     * @Groups("article")
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $commentRss;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     */
    private $commentsSlash;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Category", inversedBy="articles")
     * @Groups("article")
     */
    private $categories;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }


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
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    /**
     * Set categories
     *
     * @param \Doctrine\Common\Collections\Collection $categories
     */
    public function setCategories(Category $categories)
    {
        $this->categories = $categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
        }

        return $this;
    }

}
