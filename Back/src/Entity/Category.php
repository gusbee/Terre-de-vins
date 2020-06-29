<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("article")
     * @Groups("category")
     * @Groups("degustation")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("article")
     * @Groups("category")
     * @Groups("degustation")
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Article", mappedBy="categories")
     */
    private $articles;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Degustation", mappedBy="categories")
     */
    private $degustations;


    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->degustations = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    /**
     * Set articles
     *
     * @param \Doctrine\Common\Collections\Collection $articles
     */
    public function setArticles(Article $articles)
    {
        $this->articles = $articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addCategory($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            $article->removeCategory($this);
        }

        return $this;
    }


    /**
     * @return Collection|Degustation[]
     */
    public function getDegustations(): Collection
    {
        return $this->degustations;
    }

    /**
     * Set articles
     *
     * @param Degustation $degustations
     */
    public function setDegustations(Degustation $degustations)
    {
        $this->articles = $degustations;
    }

    public function addDegustation(Degustation $degustation): self
    {
        if (!$this->degustations->contains($degustation)) {
            $this->degustations[] = $degustation;
            $degustation->addCategory($this);
        }

        return $this;
    }

    public function removeDegustation(Degustation $degustation): self
    {
        if ($this->degustations->contains($degustation)) {
            $this->degustations->removeElement($degustation);
            $degustation->removeCategory($this);
        }

        return $this;
    }

}
